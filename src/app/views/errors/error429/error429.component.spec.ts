import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Error429Component } from './error429.component'

describe('Error429Component', () => {
  let component: Error429Component
  let fixture: ComponentFixture<Error429Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error429Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Error429Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
