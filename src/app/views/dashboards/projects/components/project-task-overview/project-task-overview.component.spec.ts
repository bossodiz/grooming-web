import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskOverviewComponent } from './project-task-overview.component';

describe('ProjectTaskOverviewComponent', () => {
  let component: ProjectTaskOverviewComponent;
  let fixture: ComponentFixture<ProjectTaskOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTaskOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
