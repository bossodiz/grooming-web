import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetVisitorComponent } from './widget-visitor.component'

describe('WidgetVisitorComponent', () => {
  let component: WidgetVisitorComponent
  let fixture: ComponentFixture<WidgetVisitorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetVisitorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetVisitorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
