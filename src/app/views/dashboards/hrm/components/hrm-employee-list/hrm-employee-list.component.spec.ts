import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmEmployeeListComponent } from './hrm-employee-list.component';

describe('HrmEmployeeListComponent', () => {
  let component: HrmEmployeeListComponent;
  let fixture: ComponentFixture<HrmEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmEmployeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
