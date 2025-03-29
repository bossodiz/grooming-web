import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetStatComponent } from './widget-stat.component'

describe('WidgetStatComponent', () => {
  let component: WidgetStatComponent
  let fixture: ComponentFixture<WidgetStatComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetStatComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetStatComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
