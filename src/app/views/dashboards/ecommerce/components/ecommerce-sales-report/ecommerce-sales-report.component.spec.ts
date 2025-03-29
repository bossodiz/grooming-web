import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceSalesReportComponent } from './ecommerce-sales-report.component'

describe('EcommerceSalesReportComponent', () => {
  let component: EcommerceSalesReportComponent
  let fixture: ComponentFixture<EcommerceSalesReportComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceSalesReportComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceSalesReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
