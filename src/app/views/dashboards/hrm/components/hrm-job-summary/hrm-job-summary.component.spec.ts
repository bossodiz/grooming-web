import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmJobSummaryComponent } from './hrm-job-summary.component';

describe('HrmJobSummaryComponent', () => {
  let component: HrmJobSummaryComponent;
  let fixture: ComponentFixture<HrmJobSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmJobSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmJobSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
