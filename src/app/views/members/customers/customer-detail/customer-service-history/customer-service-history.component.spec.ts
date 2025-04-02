import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceHistoryComponent } from './customer-service-history.component';

describe('CustomerServiceHistoryComponent', () => {
  let component: CustomerServiceHistoryComponent;
  let fixture: ComponentFixture<CustomerServiceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerServiceHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerServiceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
