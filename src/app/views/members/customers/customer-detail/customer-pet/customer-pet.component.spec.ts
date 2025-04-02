import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPetComponent } from './customer-pet.component';

describe('CustomerPetComponent', () => {
  let component: CustomerPetComponent;
  let fixture: ComponentFixture<CustomerPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
