import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRequestsComponent } from './buyer-requests.component';

describe('BuyerRequestsComponent', () => {
  let component: BuyerRequestsComponent;
  let fixture: ComponentFixture<BuyerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyerRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
