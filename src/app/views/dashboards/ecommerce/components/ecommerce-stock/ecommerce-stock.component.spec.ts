import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceStockComponent } from './ecommerce-stock.component'

describe('EcommerceStockComponent', () => {
  let component: EcommerceStockComponent
  let fixture: ComponentFixture<EcommerceStockComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceStockComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceStockComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
