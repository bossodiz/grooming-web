import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserStatusComponent } from './browser-status.component';

describe('BrowserStatusComponent', () => {
  let component: BrowserStatusComponent;
  let fixture: ComponentFixture<BrowserStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
