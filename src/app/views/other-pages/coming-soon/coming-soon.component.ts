import { calculateTimeToEvent } from '@/app/helper/utils'
import { Component, inject, OnInit, Renderer2 } from '@angular/core'
import { RouterModule } from '@angular/router'
import { credits, currentYear } from '@common/constants'
import { CountdownModule } from 'ngx-countdown'
import { interval, Subscription } from 'rxjs'

@Component({
    selector: 'app-coming-soon',
    imports: [CountdownModule, RouterModule],
    templateUrl: './coming-soon.component.html',
    styles: ``
})
export class ComingSoonComponent implements OnInit {
  currentYear = currentYear
  credits = credits

  _days?: number
  _hours?: number
  _minutes?: number
  _seconds?: number
  countdown: { days: number; hours: number; minutes: number; seconds: number } =
    {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  private intervalSubscription!: Subscription
  private renderer = inject(Renderer2)

  ngOnInit(): void {
    this.countdown = calculateTimeToEvent()
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.countdown = calculateTimeToEvent()
    })
    this.renderer.addClass(document.body, 'h-100')
  }

  // ngOnInit() {
  //   const targetDate = new Date('2026-12-31').getTime();
  //   const currentDate = new Date().getTime();
  //   const leftTime = (targetDate - currentDate) / 1000; // Convert milliseconds to seconds

  //   this.config = {
  //     leftTime: leftTime,
  //     format: 'DD:HH:mm:ss',
  //     prettyText: (text) => {
  //       const [days, hours, minutes, seconds] = text.split(':');
  //       return `
  // <div class="coming-box">${days} <span>Days</span></div>
  // <div class="coming-box">${hours} <span>Hours</span></div>
  // <div class="coming-box">${minutes} <span>Minutes</span></div>
  // <div class="coming-box">${seconds} <span>Seconds</span></div>
  // `;
  //     }
  //   };
  // }
}
