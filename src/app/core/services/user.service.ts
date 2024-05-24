import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  updateUserPassword(userData: any): Observable<any> {

    console.log("PASSWORD DATA : " + JSON.stringify(userData));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<string>(`${this.updateUrl}`,JSON.stringify(userData), {headers: headers, responseType: 'text' as 'json'});
  }


}
