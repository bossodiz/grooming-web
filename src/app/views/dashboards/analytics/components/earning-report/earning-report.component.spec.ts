import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EarningReportComponent } from './earning-report.component'

describe('EarningReportComponent', () => {
  let component: EarningReportComponent
  let fixture: ComponentFixture<EarningReportComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningReportComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EarningReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
