import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../core/models/question';
import {NgIf} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ResponsiveService} from "../core/services/responsive.service";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class QuestionComponent implements OnInit {

  @Input() question!: Question;
  @Input() selectedAnswer!: string;
  @Output() answerSelected = new EventEmitter<{ questionId: number, answer: string }>();
  isMobile!: boolean;

  constructor(private responsiveService: ResponsiveService) {
    console.log('QuestionComponent constructor called');
  }

  ngOnInit() {
    console.log('QuestionComponent ngOnInit called');
    console.log('Question received in child component:', this.question);

    this.responsiveService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

  }

  selectAnswer(answer: string) {
    this.answerSelected.emit({questionId: this.question.id, answer});
  }


}
