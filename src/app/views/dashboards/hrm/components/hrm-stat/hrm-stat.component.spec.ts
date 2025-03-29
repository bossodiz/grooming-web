import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmStatComponent } from './hrm-stat.component';

describe('HrmStatComponent', () => {
  let component: HrmStatComponent;
  let fixture: ComponentFixture<HrmStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
