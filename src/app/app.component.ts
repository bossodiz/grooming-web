import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from './services/title.service';
import { ToastComponent } from '@components/toast/toast.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hando-angular';
  private titleService = inject(TitleService);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.titleService.init();
    this.translate.use('th');
  }
}
