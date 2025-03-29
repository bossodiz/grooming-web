import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAplicantsComponent } from './job-aplicants.component';

describe('JobAplicantsComponent', () => {
  let component: JobAplicantsComponent;
  let fixture: ComponentFixture<JobAplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAplicantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
