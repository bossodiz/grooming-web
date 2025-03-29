import { Component } from '@angular/core'
import { compaignData } from '../../data'

@Component({
    selector: 'app-compaign-source',
    imports: [],
    templateUrl: './compaign-source.component.html',
    styles: ``
})
export class CompaignSourceComponent {
  compaignData = compaignData
}
