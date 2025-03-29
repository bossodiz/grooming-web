import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceOrderReviewComponent } from './ecommerce-order-review.component'

describe('EcommerceOrderReviewComponent', () => {
  let component: EcommerceOrderReviewComponent
  let fixture: ComponentFixture<EcommerceOrderReviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceOrderReviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceOrderReviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
