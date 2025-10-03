import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { WaitService } from '../../services/waitlist.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-landing',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  standalone: true,
})
export class Landing implements AfterViewInit {
  waitlistForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  showSuccessToast = false;
  showErrorToast = false;

  constructor(
    private authService: AuthService,
    private waitService: WaitService
  ) {}
  ngAfterViewInit() {
    //confetti({ particleCount: 50 });
  }
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

  openWaitlistModal(): void {
    const modal = document.getElementById(
      'waitlist_modal'
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  closeWaitlistModal(): void {
    const modal = document.getElementById(
      'waitlist_modal'
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  launchConfetti(): void {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  onWaitlistSubmit(): void {
    if (this.waitlistForm.valid) {
      const email = this.waitlistForm.value.email;
      if (email) {
        this.waitService.joinWaitlist({ email }).subscribe({
          next: (response) => {
            this.closeWaitlistModal();

            if (response.success === true) {
              this.showSuccessToast = true;
              this.launchConfetti();
              setTimeout(() => {
                this.showSuccessToast = false;
              }, 3000);
            } else {
              this.showErrorToast = true;
              setTimeout(() => {
                this.showErrorToast = false;
              }, 3000);
            }
          },
          error: (error) => {
            this.closeWaitlistModal();
            this.showErrorToast = true;
            setTimeout(() => {
              this.showErrorToast = false;
            }, 3000);
          },
        });
      }
    }
  }
}
