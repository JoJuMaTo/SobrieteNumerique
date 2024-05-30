import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../core/models/question';
import { QuestionService } from '../core/services/question.service';
import { QuestionnaireStateService } from '../core/services/questionnaire-state.service';
import { CommonModule, NgIf } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from "@angular/router";

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    HttpClientModule,
    QuestionComponent
  ],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class QuestionnaireComponent implements OnInit {

  isLoading: boolean = true;
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  currentQuestionIndex: number = 0;
  selectedAnswers: { [key: number]: string } = {};
  questionKey: number = 0;
  animationState: string = '';

  constructor(
    private questionService: QuestionService,
    private questionnaireStateService: QuestionnaireStateService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    console.log('QuestionnaireComponent constructor called');
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    const savedQuestions = this.questionnaireStateService.getQuestions();
    const savedCurrentQuestionIndex = this.questionnaireStateService.getCurrentQuestionIndex();
    const savedSelectedAnswers = this.questionnaireStateService.getSelectedAnswers();

    if (savedQuestions.length > 0) {
      this.questions = savedQuestions;
      this.currentQuestionIndex = savedCurrentQuestionIndex;
      this.selectedAnswers = savedSelectedAnswers;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.questionKey = this.currentQuestion.id;
      this.isLoading = false;
      this.cdr.detectChanges();
    } else {
      this.questionService.getQuestions().subscribe({
        next: (questions) => {
          this.questions = questions;
          this.currentQuestionIndex = 0;
          this.currentQuestion = questions[0];
          this.questionKey = this.currentQuestion.id;
          this.questionnaireStateService.setQuestions(questions);
          this.questionnaireStateService.setCurrentQuestionIndex(this.currentQuestionIndex);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading questions', error);
          this.isLoading = false;
        }
      });
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {


        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.questionKey = this.currentQuestion.id;
        this.questionnaireStateService.setCurrentQuestionIndex(this.currentQuestionIndex);
        this.cdr.detectChanges();
            this.triggerAnimation();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.triggerAnimation();
      setTimeout(() => {
        this.currentQuestionIndex--;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.questionKey = this.currentQuestion.id;
        this.questionnaireStateService.setCurrentQuestionIndex(this.currentQuestionIndex);
        this.cdr.detectChanges();
      }, 300); // Match the duration of the animation
    }
  }

  selectAnswer(event: { questionId: number, answer: string }) {
    this.selectedAnswers[event.questionId] = event.answer;
    this.questionnaireStateService.setSelectedAnswers(this.selectedAnswers);
  }

  isAnswerSelected(questionId: number, answer: string): boolean {
    return this.selectedAnswers[questionId] === answer;
  }

  triggerAnimation() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([`questionnaire`]);
      this.animationState = this.animationState === 'in' ? 'out' : 'in';
    });
  }

}
