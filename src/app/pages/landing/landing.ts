import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../common/header/header';
import { Footer } from '../../common/footer/footer';

@Component({
  selector: 'app-landing',
  imports: [ReactiveFormsModule, CommonModule, Header, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true,
})
export class Landing {
  waitlistForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  showSuccessToast = false;
  showErrorToast = false;

  constructor(private authService: AuthService) {}
  startWithGoogle(): void {
    this.authService.login().subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: (error) => {
        console.error('Error during login:', error);
      },
    });
  }
}
