import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUrl: string = `${environment.apiUrl}/user/register`;
  updateUrl: string = `${environment.apiUrl}/user/update`;
  deleteUrl: string = `${environment.apiUrl}/user/delete`;


  constructor(private http: HttpClient) {
  }

  saveNewUser(userForm: FormGroup): Observable<any> {


    return this.http.post<string>(`${this.registerUrl}`, JSON.stringify(userForm), {responseType: 'text' as 'json'});
  }

  updateUserPassword(userData: any): Observable<any> {

    console.log("PASSWORD DATA : " + JSON.stringify(userData));
    let token: string | null = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<string>(`${this.updateUrl}`, JSON.stringify(userData), {
      headers: headers,
      responseType: 'text' as 'json'
    });
  }

  deleteUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<string>(`${this.deleteUrl}`, {headers: headers, responseType: 'text' as 'json'});
  }
}
