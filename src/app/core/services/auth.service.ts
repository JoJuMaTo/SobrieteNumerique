import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";

export interface AuthRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  loggedIn = new BehaviorSubject<boolean>(localStorage.getItem('isAuthenticated') === 'true');
  private loginUrl: string = 'http://192.168.88.79:8000/user/login';


  constructor(private http: HttpClient, private router: Router) {
  }



  private setAuthState(isAuthenticated: boolean, username: string | null): void {

    this.loggedIn.next(isAuthenticated);
    this.username.next(username);
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (username) {
      localStorage.setItem('username', username);
      console.log(localStorage)
    } else {
      localStorage.removeItem('username');
    }

  }

  login(credentials: { username: string; password: string }): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    console.log("données transmises : " + body);
    return this.http.post<string>(this.loginUrl, body.toString(), { headers, responseType: 'text' as 'json' })
      .pipe(
        tap(token => {
          localStorage.setItem('token', token);
          this.setAuthState(true, credentials.username);
        }),
        catchError(error => {
          console.error('Login failed', error);
          this.setAuthState(false, null);
          return throwError(() => new Error('Login failed'));
        })
      );
  }


  getUsername(): Observable<string | null> {
    return this.username.asObservable();
  }


  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.setAuthState(false, null);
    this.router.navigate(['/']);
  }
}
