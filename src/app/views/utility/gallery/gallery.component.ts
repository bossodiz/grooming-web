import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { LightgalleryModule } from 'lightgallery/angular'

@Component({
    selector: 'app-gallery',
    imports: [BreadcrumbComponent, LightgalleryModule],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  setting = {
    download: false,
    counter: false,
    selector: 'a',
  }
}
