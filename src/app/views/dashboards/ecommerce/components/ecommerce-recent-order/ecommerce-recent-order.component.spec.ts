import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceRecentOrderComponent } from './ecommerce-recent-order.component'

describe('EcommerceRecentOrderComponent', () => {
  let component: EcommerceRecentOrderComponent
  let fixture: ComponentFixture<EcommerceRecentOrderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceRecentOrderComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceRecentOrderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
