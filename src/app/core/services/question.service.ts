import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Question } from "../models/question";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
    console.log('QuestionService constructor called');
  }

  getQuestions(): Observable<Question[]> {
    console.log('getQuestions called');
    return this.http.get<Question[]>(`${environment.apiUrl}/quiz/9`);
  }
}
