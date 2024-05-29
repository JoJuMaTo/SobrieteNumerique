import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../core/models/question';
import { QuestionService } from '../core/services/question.service';
import { CommonModule, NgIf } from '@angular/common';
import { QuestionComponent } from '../question/question.component';

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

})
export class QuestionnaireComponent implements OnInit {

  isLoading: boolean = true;
  questions$ = new BehaviorSubject<Question[]>([]);
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  selectedAnswers: { [key: number]: string } = {};
  questionKey: number = 0;
  animationState: string = '';

  constructor(private questionService: QuestionService, private cdr: ChangeDetectorRef) {
    console.log('QuestionnaireComponent constructor called');
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe({
      next: (questions) => {
        this.questions = questions;
        this.questions$.next([...questions]);
        this.currentQuestion = questions[0];  // Set the first question as the current question
        this.questionKey = this.currentQuestion.id;
        console.log('Questions received:', questions);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading questions', error);
        this.isLoading = false;
      }
    });
  }

  nextQuestion() {
    const nextIndex = this.questions.indexOf(this.currentQuestion!) + 1;
    if (nextIndex < this.questions.length) {
      this.triggerAnimation();
      setTimeout(() => {
        this.currentQuestion = this.questions[nextIndex];
        this.questionKey = this.currentQuestion.id;
        this.cdr.detectChanges();
      }, 500);
    }
  }

  previousQuestion() {
    const prevIndex = this.questions.indexOf(this.currentQuestion!) - 1;
    if (prevIndex >= 0) {
      this.triggerAnimation();
      setTimeout(() => {
        this.currentQuestion = this.questions[prevIndex];
        this.questionKey = this.currentQuestion.id;
        this.cdr.detectChanges();
      }, 500);
    }
  }

  selectAnswer(event: { questionId: number, answer: string }) {
    this.selectedAnswers[event.questionId] = event.answer;
  }

  isAnswerSelected(questionId: number, answer: string): boolean {
    return this.selectedAnswers[questionId] === answer;
  }

  triggerAnimation() {
    this.animationState = this.animationState === 'in' ? 'out' : 'in';
  }
}
