import {
  Component,
  inject,
  Renderer2,
  type OnDestroy,
  type OnInit,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule,NgbCarouselModule],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent  {
}
