import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Question} from '../models/question';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireStateService {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  private currentQuestionIndexSubject = new BehaviorSubject<number>(0);
  private selectedAnswersSubject = new BehaviorSubject<{ [key: number]: string }>({});

  answersReturn : Subscription;
  // questions$ = this.questionsSubject.asObservable();
  // currentQuestionIndex$ = this.currentQuestionIndexSubject.asObservable();
  // selectedAnswers$ = this.selectedAnswersSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  setQuestions(questions: Question[]) {
    this.questionsSubject.next(questions);
  }

  setCurrentQuestionIndex(index: number) {
    this.currentQuestionIndexSubject.next(index);
  }

  setSelectedAnswers(answers: { [key: number]: string }) {
    this.selectedAnswersSubject.next(answers);
    console.log(answers);
    console.log(this.selectedAnswersSubject);
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

  // sendSelectedAnswers(): void {
  //   const answersToSendArray = Object.entries(this.selectedAnswersSubject.getValue()).map(([key, value]) => ({ [key]: value }));
  //   console.log("\n*** DATA ENVOYEE A LA VALIDATION : ***\n" + JSON.stringify(answersToSendArray, null, 2));
  //   this.http.post(`${environment.apiUrl}/quiz/9/response`, JSON.stringify(answersToSendArray, null, 2)).subscribe();
  //
  //
  // }

  sendSelectedAnswers(): void {
    const answersToSendArray = Object.entries(this.selectedAnswersSubject.getValue()).map(([key, value]) => ({
      question_id: key,
      answer: value
    }));

    console.log("\n*** DATA ENVOYEE A LA VALIDATION : ***\n" + JSON.stringify(answersToSendArray, null, 2));

    this.answersReturn = this.http.post<HttpResponse<any>>(`${environment.apiUrl}/quiz/9/response`, JSON.stringify(answersToSendArray, null, 2), {responseType: "text" as "json"}).subscribe();
  }


}
