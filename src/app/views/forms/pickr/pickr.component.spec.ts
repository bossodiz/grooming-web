import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PickrComponent } from './pickr.component'

describe('PickrComponent', () => {
  let component: PickrComponent
  let fixture: ComponentFixture<PickrComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickrComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PickrComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
