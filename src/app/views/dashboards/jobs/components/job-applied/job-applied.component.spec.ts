import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppliedComponent } from './job-applied.component';

describe('JobAppliedComponent', () => {
  let component: JobAppliedComponent;
  let fixture: ComponentFixture<JobAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAppliedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
