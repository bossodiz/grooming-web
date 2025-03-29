import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceSalesByCountryComponent } from './ecommerce-sales-by-country.component'

describe('EcommerceSalesByCountryComponent', () => {
  let component: EcommerceSalesByCountryComponent
  let fixture: ComponentFixture<EcommerceSalesByCountryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceSalesByCountryComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceSalesByCountryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
