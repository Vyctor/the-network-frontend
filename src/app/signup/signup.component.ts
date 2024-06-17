import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public createAccountForm: FormGroup;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.createAccountForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async createAccount() {
    if (this.createAccountForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    const { name, email, password } = this.createAccountForm.value;
    this.http
      .post('http://localhost:3000/users', {
        name,
        email,
        password,
      })
      .subscribe((response) => {
        this.createAccountForm.reset();
        this.router.navigate(['/login']);
      });
  }
}
