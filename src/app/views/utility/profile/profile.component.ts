import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { AboutComponent } from './components/about/about.component'
import { WorkComponent } from './components/work/work.component'
import { EducationComponent } from './components/education/education.component'
import { SettingComponent } from './components/setting/setting.component'
import { FriendsComponent } from './components/friends/friends.component'

@Component({
    selector: 'app-profile',
    imports: [
        BreadcrumbComponent,
        NgbNavModule,
        AboutComponent,
        WorkComponent,
        EducationComponent,
        SettingComponent,
        FriendsComponent,
    ],
    templateUrl: './profile.component.html',
    styles: ``
})
export class ProfileComponent {}
