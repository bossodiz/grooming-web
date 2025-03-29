import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetMoneyFlowComponent } from './widget-money-flow.component'

describe('WidgetMoneyFlowComponent', () => {
  let component: WidgetMoneyFlowComponent
  let fixture: ComponentFixture<WidgetMoneyFlowComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetMoneyFlowComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetMoneyFlowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
