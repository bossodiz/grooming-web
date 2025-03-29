import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetAnalyticsComponent } from './widget-analytics.component'

describe('WidgetAnalyticsComponent', () => {
  let component: WidgetAnalyticsComponent
  let fixture: ComponentFixture<WidgetAnalyticsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetAnalyticsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetAnalyticsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
