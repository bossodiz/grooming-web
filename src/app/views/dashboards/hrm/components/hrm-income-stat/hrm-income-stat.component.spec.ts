import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmIncomeStatComponent } from './hrm-income-stat.component';

describe('HrmIncomeStatComponent', () => {
  let component: HrmIncomeStatComponent;
  let fixture: ComponentFixture<HrmIncomeStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmIncomeStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmIncomeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
