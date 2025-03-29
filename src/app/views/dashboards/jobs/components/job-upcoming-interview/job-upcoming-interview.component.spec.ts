import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUpcomingInterviewComponent } from './job-upcoming-interview.component';

describe('JobUpcomingInterviewComponent', () => {
  let component: JobUpcomingInterviewComponent;
  let fixture: ComponentFixture<JobUpcomingInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobUpcomingInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobUpcomingInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
