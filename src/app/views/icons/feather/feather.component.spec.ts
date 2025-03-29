import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FeatherComponent } from './feather.component'

describe('FeatherComponent', () => {
  let component: FeatherComponent
  let fixture: ComponentFixture<FeatherComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatherComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FeatherComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
