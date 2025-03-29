import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceSellingComponent } from './ecommerce-selling.component'

describe('EcommerceSellingComponent', () => {
  let component: EcommerceSellingComponent
  let fixture: ComponentFixture<EcommerceSellingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceSellingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceSellingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
