import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptKlippaComponent } from './receipt-klippa.component';

describe('ReceiptKlippaComponent', () => {
  let component: ReceiptKlippaComponent;
  let fixture: ComponentFixture<ReceiptKlippaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptKlippaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptKlippaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
