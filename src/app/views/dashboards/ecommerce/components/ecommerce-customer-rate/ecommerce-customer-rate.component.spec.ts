import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceCustomerRateComponent } from './ecommerce-customer-rate.component'

describe('EcommerceCustomerRateComponent', () => {
  let component: EcommerceCustomerRateComponent
  let fixture: ComponentFixture<EcommerceCustomerRateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceCustomerRateComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceCustomerRateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
