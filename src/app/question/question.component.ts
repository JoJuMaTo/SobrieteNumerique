import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../core/models/question';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;

  constructor() {
    console.log('QuestionComponent constructor called');

  }

  ngOnInit() {
    console.log('QuestionComponent ngOnInit called');
    console.log('Question:', this.question);
  }

  protected readonly Question = Question;
}
