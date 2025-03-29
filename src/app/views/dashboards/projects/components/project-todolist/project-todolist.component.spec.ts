import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTodolistComponent } from './project-todolist.component';

describe('ProjectTodolistComponent', () => {
  let component: ProjectTodolistComponent;
  let fixture: ComponentFixture<ProjectTodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTodolistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
