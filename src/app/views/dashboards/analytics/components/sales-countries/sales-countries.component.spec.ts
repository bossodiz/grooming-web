import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SalesCountriesComponent } from './sales-countries.component'

describe('SalesCountriesComponent', () => {
  let component: SalesCountriesComponent
  let fixture: ComponentFixture<SalesCountriesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCountriesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SalesCountriesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
