import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EcommerceStatComponent } from './ecommerce-stat.component'

describe('EcommerceStatComponent', () => {
  let component: EcommerceStatComponent
  let fixture: ComponentFixture<EcommerceStatComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceStatComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(EcommerceStatComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
