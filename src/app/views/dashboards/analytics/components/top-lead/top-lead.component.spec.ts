import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TopLeadComponent } from './top-lead.component'

describe('TopLeadComponent', () => {
  let component: TopLeadComponent
  let fixture: ComponentFixture<TopLeadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLeadComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TopLeadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
