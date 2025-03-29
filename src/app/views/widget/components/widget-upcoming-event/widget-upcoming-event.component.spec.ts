import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetUpcomingEventComponent } from './widget-upcoming-event.component'

describe('WidgetUpcomingEventComponent', () => {
  let component: WidgetUpcomingEventComponent
  let fixture: ComponentFixture<WidgetUpcomingEventComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetUpcomingEventComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetUpcomingEventComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
