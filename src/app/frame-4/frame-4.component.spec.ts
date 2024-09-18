import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame4Component } from './frame-4.component';

describe('Frame4Component', () => {
  let component: Frame4Component;
  let fixture: ComponentFixture<Frame4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frame4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Frame4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
