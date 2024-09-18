import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOfferingsComponent } from './service-offerings.component';

describe('ServiceOfferingsComponent', () => {
  let component: ServiceOfferingsComponent;
  let fixture: ComponentFixture<ServiceOfferingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOfferingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
