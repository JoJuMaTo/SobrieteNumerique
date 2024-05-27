import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {CustomModalComponent} from "../custom-modal/custom-modal.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomModalComponent,
    NgIf
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  updateUrl: string = `${environment.apiUrl}/user/update`;
  deleteUrl: string = `${environment.apiUrl}/user/delete`;


  accountRemovalForm!: FormGroup;
  passwordForm!: FormGroup;
  @Input() user!: User;
  showModal = false;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({

      oldpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      // username: localStorage.getItem('username'),


    })

    this.accountRemovalForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // username: localStorage.getItem('username'),


    })
  }



  onSubmitUpdateForm(): void{

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

  onSubmitRemovalForm(): void{

    const userRemovalData = {
      ...this.accountRemovalForm.value,
      token: localStorage.getItem('token')
    };
    this.userService.deleteUser(userRemovalData).subscribe();
    this.authService.logout();

  }

  handleConfirmation(result: boolean) {
    this.showModal = false;
    if (result) {
      console.log('User clicked OK');
      this.onSubmitRemovalForm()
    } else {
      console.log('User clicked Cancel');
    }

  }

}
