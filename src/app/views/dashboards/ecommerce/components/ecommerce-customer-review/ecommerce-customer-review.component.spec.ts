import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceCustomerReviewComponent } from './ecommerce-customer-review.component'

describe('EcommerceCustomerReviewComponent', () => {
  let component: EcommerceCustomerReviewComponent
  let fixture: ComponentFixture<EcommerceCustomerReviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceCustomerReviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceCustomerReviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
