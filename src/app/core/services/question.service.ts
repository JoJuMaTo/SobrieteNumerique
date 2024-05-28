import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Question } from "../models/question";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {

    return this.http.get<Question[]>(`${environment.apiUrl}/quiz/1`, { responseType:'json' });
  }
}
