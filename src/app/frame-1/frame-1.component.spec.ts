import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame1Component } from './frame-1.component';

describe('Frame1Component', () => {
  let component: Frame1Component;
  let fixture: ComponentFixture<Frame1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frame1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Frame1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
