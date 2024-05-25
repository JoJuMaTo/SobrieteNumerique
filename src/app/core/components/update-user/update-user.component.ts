import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

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

  updateUrl: string = `${environment.apiUrl}/user/update`;


  passwordForm!: FormGroup;
  @Input() user!: User;


  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({

      oldpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      // username: localStorage.getItem('username'),


    })
  }



  onSubmitForm(): void{

    const userData = {
      ...this.passwordForm.value,
      token: localStorage.getItem('token')
    };
    console.log("PASSWORD DATA : " + JSON.stringify(userData) )

    // return this.http.put<string>(`${this.updateUrl}`,JSON.stringify(userData), {responseType: 'text' as 'json'});

     this.userService.updateUserPassword(userData).pipe(
       map(result => console.log(result.toString())),
     ).subscribe();
  }
}
