import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetEarningComponent } from './widget-earning.component'

describe('WidgetEarningComponent', () => {
  let component: WidgetEarningComponent
  let fixture: ComponentFixture<WidgetEarningComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetEarningComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetEarningComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
