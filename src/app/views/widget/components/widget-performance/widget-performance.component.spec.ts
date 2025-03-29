import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetPerformanceComponent } from './widget-performance.component'

describe('WidgetPerformanceComponent', () => {
  let component: WidgetPerformanceComponent
  let fixture: ComponentFixture<WidgetPerformanceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetPerformanceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetPerformanceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
