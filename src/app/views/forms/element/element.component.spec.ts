import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ElementComponent } from './element.component'

describe('ElementComponent', () => {
  let component: ElementComponent
  let fixture: ComponentFixture<ElementComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ElementComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
