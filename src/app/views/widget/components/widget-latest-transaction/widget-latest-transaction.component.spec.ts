import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetLatestTransactionComponent } from './widget-latest-transaction.component'

describe('WidgetLatestTransactionComponent', () => {
  let component: WidgetLatestTransactionComponent
  let fixture: ComponentFixture<WidgetLatestTransactionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetLatestTransactionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WidgetLatestTransactionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
