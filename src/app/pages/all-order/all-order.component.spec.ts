import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrederComponent } from './all-order.component';

describe('AllOrederComponent', () => {
  let component: AllOrederComponent;
  let fixture: ComponentFixture<AllOrederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOrederComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
