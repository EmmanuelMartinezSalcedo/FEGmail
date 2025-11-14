import { AfterViewInit, Component } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements AfterViewInit {
  waitlistForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  showSuccessToast = false;
  showErrorToast = false;
  isDarkMode = false;
  constructor(
    private authService: AuthService,
    private waitService: WaitService,
    private router: Router
  ) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'thebigbutwhy';
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      this.isDarkMode = false;
      document.documentElement.setAttribute('data-theme', 'fluffyfan');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'thebigbutwhy' : 'fluffyfan';

    document.documentElement.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);
  }
  ngAfterViewInit(): void {}

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
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
