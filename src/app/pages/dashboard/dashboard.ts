import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LabelStat } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface ProcessedEmail {
  processedAt: string;
  labelAssigned: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('emailChart') emailChart!: ElementRef<HTMLCanvasElement>;

  labelStats: LabelStat[] = [];
  processedEmails: ProcessedEmail[] = [];
  chart?: Chart;

  badgeColors: string[] = [
    'badge-primary',
    'badge-secondary',
    'badge-accent',
    'badge-info',
    'badge-success',
    'badge-warning',
    'badge-error',
  ];

  chartColors: string[] = [
    'rgb(59, 130, 246)',
    'rgb(139, 92, 246)',
    'rgb(236, 72, 153)',
    'rgb(34, 197, 94)',
    'rgb(251, 146, 60)',
    'rgb(245, 158, 11)',
    'rgb(239, 68, 68)',
  ];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getLabelStats();
    this.getProcessedEmails();
  }

  ngAfterViewInit(): void {
    //
  }

  getLabelStats(): void {
    this.userService.getLabelStats().subscribe((response) => {
      this.labelStats = response.labelStats;
    });
  }

  getProcessedEmails(): void {
    this.userService.getProcessedEmails().subscribe((response) => {
      this.processedEmails = response.emails;
      this.createChart();
    });
  }

  createChart(): void {
    if (!this.emailChart) return;

    const now = new Date();
    const last12Hours: string[] = [];

    for (let i = 11; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      last12Hours.push(
        hour.toLocaleTimeString('en-US', {
          hour: '2-digit',
          hour12: false,
        })
      );
    }

    const labelData: { [key: string]: number[] } = {};

    this.processedEmails.forEach((email) => {
      const emailDate = new Date(email.processedAt);
      const hourIndex = this.getHourIndex(emailDate, now);

      if (hourIndex >= 0 && hourIndex < 12) {
        if (!labelData[email.labelAssigned]) {
          labelData[email.labelAssigned] = new Array(12).fill(0);
        }
        labelData[email.labelAssigned][11 - hourIndex]++;
      }
    });

    const datasets = Object.keys(labelData).map((label, index) => ({
      label: label,
      data: labelData[label],
      borderColor: this.chartColors[index % this.chartColors.length],
      backgroundColor: this.chartColors[index % this.chartColors.length] + '20',
      tension: 0.4,
      fill: false,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }));

    const ctx = this.emailChart.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: last12Hours,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 15,
              },
            },
            title: {
              display: true,
              text: 'Email Processing Activity',
              font: {
                size: 16,
                weight: 'bold',
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
              title: {
                display: true,
                text: 'Number of Emails',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Time (last 12 hours)',
              },
            },
          },
        },
      });
    }
  }

  getHourIndex(emailDate: Date, now: Date): number {
    const diffMs = now.getTime() - emailDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours;
  }

  getBadgeClass(index: number): string {
    return this.badgeColors[index % this.badgeColors.length];
  }

  logout(): void {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
