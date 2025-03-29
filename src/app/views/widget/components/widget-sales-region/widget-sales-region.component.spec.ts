import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetSalesRegionComponent } from './widget-sales-region.component'

describe('WidgetSalesRegionComponent', () => {
  let component: WidgetSalesRegionComponent
  let fixture: ComponentFixture<WidgetSalesRegionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetSalesRegionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetSalesRegionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
