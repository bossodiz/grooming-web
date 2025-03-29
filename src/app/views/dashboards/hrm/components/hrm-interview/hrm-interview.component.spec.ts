import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmInterviewComponent } from './hrm-interview.component';

describe('HrmInterviewComponent', () => {
  let component: HrmInterviewComponent;
  let fixture: ComponentFixture<HrmInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
