import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgExchangeVoucherComponent } from './dlg-exchange-voucher.component';

describe('DlgExchangeVoucherComponent', () => {
  let component: DlgExchangeVoucherComponent;
  let fixture: ComponentFixture<DlgExchangeVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgExchangeVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgExchangeVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
