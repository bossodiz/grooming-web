import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CompaignSourceComponent } from './compaign-source.component'

describe('CompaignSourceComponent', () => {
  let component: CompaignSourceComponent
  let fixture: ComponentFixture<CompaignSourceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaignSourceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CompaignSourceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
