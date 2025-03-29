import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextUpcomingEventComponent } from './next-upcoming-event.component';

describe('NextUpcomingEventComponent', () => {
  let component: NextUpcomingEventComponent;
  let fixture: ComponentFixture<NextUpcomingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextUpcomingEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextUpcomingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
