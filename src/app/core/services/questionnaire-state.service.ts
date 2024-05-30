import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireStateService {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  private currentQuestionIndexSubject = new BehaviorSubject<number>(0);
  private selectedAnswersSubject = new BehaviorSubject<{ [key: number]: string }>({});

  questions$ = this.questionsSubject.asObservable();
  currentQuestionIndex$ = this.currentQuestionIndexSubject.asObservable();
  selectedAnswers$ = this.selectedAnswersSubject.asObservable();

  setQuestions(questions: Question[]) {
    this.questionsSubject.next(questions);
  }

  setCurrentQuestionIndex(index: number) {
    this.currentQuestionIndexSubject.next(index);
  }

  setSelectedAnswers(answers: { [key: number]: string }) {
    this.selectedAnswersSubject.next(answers);
    console.log(answers);
  }

  getQuestions(): Question[] {
    return this.questionsSubject.value;
  }

  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndexSubject.value;
  }

  getSelectedAnswers(): { [key: number]: string } {
    return this.selectedAnswersSubject.value;
  }
  //TODO méthode renvoi choix user
}
