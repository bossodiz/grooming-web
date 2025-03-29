import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VisitDeviceComponent } from './visit-device.component'

describe('VisitDeviceComponent', () => {
  let component: VisitDeviceComponent
  let fixture: ComponentFixture<VisitDeviceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitDeviceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(VisitDeviceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
