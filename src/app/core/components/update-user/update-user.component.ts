import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  updateUrl: string = 'http://192.168.88.79:8000/user/update';


  passwordForm!: FormGroup;
  @Input() user!: User;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private http: HttpClient) {
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({

      oldpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      // username: localStorage.getItem('username'),


    })
  }



  onSubmitForm(): Observable<string>{

    const userData = {
      ...this.passwordForm.value,
      token: localStorage.getItem('token')
    };
    console.log("PASSWORD DATA : " + JSON.stringify(userData) )
    return this.http.put<string>(`${this.updateUrl}`,JSON.stringify(userData), {responseType: 'text' as 'json'});

     // this.userService.updateUserPassword(userData).subscribe();
  }
}
