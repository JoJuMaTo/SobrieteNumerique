import { Injectable } from '@angular/core';
import {User} from '../models/user'
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL!: string;


  constructor(private http: HttpClient) {
  }

  saveNewUser(user: User): Observable<any> {

    //TODO : définir URL de l'API côté serveur

    return this.http.post(`http://${this.apiURL}`, user, {responseType: 'text' as 'json'});
  }

}
