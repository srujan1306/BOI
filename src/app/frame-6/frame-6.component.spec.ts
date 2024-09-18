import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame6Component } from './frame-6.component';

describe('Frame6Component', () => {
  let component: Frame6Component;
  let fixture: ComponentFixture<Frame6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frame6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Frame6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
