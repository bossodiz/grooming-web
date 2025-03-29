import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationStatissticsComponent } from './job-application-statisstics.component';

describe('JobApplicationStatissticsComponent', () => {
  let component: JobApplicationStatissticsComponent;
  let fixture: ComponentFixture<JobApplicationStatissticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicationStatissticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationStatissticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
