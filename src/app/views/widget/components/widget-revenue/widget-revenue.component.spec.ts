import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetRevenueComponent } from './widget-revenue.component'

describe('WidgetRevenueComponent', () => {
  let component: WidgetRevenueComponent
  let fixture: ComponentFixture<WidgetRevenueComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetRevenueComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetRevenueComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
