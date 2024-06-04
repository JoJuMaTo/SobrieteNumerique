import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionnaireStateService } from '../core/services/questionnaire-state.service';
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  score$: Observable<number>;
  advice$: Observable<string>;

  constructor(private questionnaireStateService: QuestionnaireStateService) { }

  ngOnInit(): void {
    this.score$ = this.questionnaireStateService.getScore();
  }
}
