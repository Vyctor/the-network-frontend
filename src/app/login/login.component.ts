import { CommonModule } from '@angular/common';
import { FetchBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  ngOnInit(): void {}

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    const { email, password } = this.loginForm.value;
    try {
      const token = await firstValueFrom(
        this.http.post('http://localhost:3000/auth', {
          email,
          password,
        })
      );

      this.router.navigate(['/feed']);
      console.info('Logged in successfully: ', token);
    } catch (err) {
      console.error('Error logging in', err);
    }
  }
}
