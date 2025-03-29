import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetBoardingComponent } from './widget-boarding.component'

describe('WidgetBoardingComponent', () => {
  let component: WidgetBoardingComponent
  let fixture: ComponentFixture<WidgetBoardingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetBoardingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetBoardingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
