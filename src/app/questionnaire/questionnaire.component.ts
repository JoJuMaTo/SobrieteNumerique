import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, finalize, Subject, takeUntil } from "rxjs";
import { Question } from "../core/models/question";
import { QuestionService } from "../core/services/question.service";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgForOf, NgIf } from "@angular/common";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

  questionsSubject$ = new BehaviorSubject<Question[]>([]);
  private destroy$ = new Subject<void>();
  isLoading: boolean = true;
  currentQuestionIndex = 0;
  questions: Question[] = [];
  @Input() question!: Question;
  selectedAnswers: { [key: number]: string } = {};

  constructor(private http: HttpClient, private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().pipe(
      takeUntil(this.destroy$),
      map(questions => {
        this.questions = questions;
        console.log(questions)
        this.questionsSubject$.next(this.questions);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectAnswer(questionId: number, answer: string) {
    this.selectedAnswers[questionId] = answer;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  isAnswerSelected(questionId: number, answer: string): boolean {
    return this.selectedAnswers[questionId] === answer;
  }
}
