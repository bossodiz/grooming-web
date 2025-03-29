import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopSessionComponent } from './top-session.component'

describe('TopSessionComponent', () => {
  let component: TopSessionComponent
  let fixture: ComponentFixture<TopSessionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSessionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TopSessionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
