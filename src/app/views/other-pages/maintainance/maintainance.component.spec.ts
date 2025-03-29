import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MaintainanceComponent } from './maintainance.component'

describe('MaintainanceComponent', () => {
  let component: MaintainanceComponent
  let fixture: ComponentFixture<MaintainanceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintainanceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MaintainanceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
