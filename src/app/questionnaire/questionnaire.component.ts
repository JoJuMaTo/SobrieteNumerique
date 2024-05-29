import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Question } from '../core/models/question';
import { QuestionService } from '../core/services/question.service';
import {CommonModule, NgFor, NgIf} from '@angular/common';
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
  questions: Question[] = [];

  constructor(private questionService: QuestionService,  private cdr: ChangeDetectorRef) {
    console.log('QuestionnaireComponent constructor called');
  }

  ngOnInit() {
    this.questionService.getQuestions().pipe(
      map(data => {
        this.questions = data;
        this.cdr.markForCheck();
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
      catchError(error => {
        console.error('Error fetching questions:', error);
        return of([]);
      })
    ).subscribe();
  }
}
