import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgExchangeSuccessComponent } from './dlg-exchange-success.component';

describe('DlgExchangeSuccessComponent', () => {
  let component: DlgExchangeSuccessComponent;
  let fixture: ComponentFixture<DlgExchangeSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgExchangeSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgExchangeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
