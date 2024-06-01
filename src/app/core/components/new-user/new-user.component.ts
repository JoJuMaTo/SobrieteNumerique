import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {


  userForm!: FormGroup;
  @Input() user!: User;


  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmitForm(): void {


    this.userService.saveNewUser(this.userForm.value).subscribe();
  }
}
