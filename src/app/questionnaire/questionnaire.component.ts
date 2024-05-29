import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Question } from '../core/models/question';
import { QuestionService } from '../core/services/question.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    HttpClientModule,
    QuestionComponent
  ],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionnaireComponent implements OnInit {

  isLoading: boolean = true;
  questions$ = new BehaviorSubject<Question[]>([]);
  questions!: Observable<Question[]> ;
  constructor(private questionService: QuestionService, private cdr: ChangeDetectorRef) {
    console.log('QuestionnaireComponent constructor called');
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe({
      next: (questions) => {
        this.questions$.next([...questions]);
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
}
