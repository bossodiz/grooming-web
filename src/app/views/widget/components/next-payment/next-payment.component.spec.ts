import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPaymentComponent } from './next-payment.component';

describe('NextPaymentComponent', () => {
  let component: NextPaymentComponent;
  let fixture: ComponentFixture<NextPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
