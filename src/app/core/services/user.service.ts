import {Injectable, Input} from '@angular/core';
import {User} from '../models/user'
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUrl: string = 'http://192.168.88.79:8000/user/register';
  updateUrl: string = 'http://192.168.88.79:8000/user/update';


  constructor(private http: HttpClient) {
  }

  saveNewUser(userForm : FormGroup): Observable<any> {

    //TODO : définir URL de l'API côté serveur

    return this.http.post<string>(`${this.registerUrl}`,userForm.value, {responseType: 'text' as 'json'});
  }

  updateUserPassword(passwordForm: FormGroup): Observable<any> {

    console.log("PASSWORD DATA : " + passwordForm.value)
    return this.http.put<string>(`${this.updateUrl}`,passwordForm.value, {responseType: 'text' as 'json'});
  }


}
