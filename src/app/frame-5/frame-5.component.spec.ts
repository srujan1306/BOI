import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame5Component } from './frame-5.component';

describe('Frame5Component', () => {
  let component: Frame5Component;
  let fixture: ComponentFixture<Frame5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frame5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Frame5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
