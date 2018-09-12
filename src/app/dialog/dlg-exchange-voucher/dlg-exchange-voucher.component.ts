import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Voucher } from '../../services/app.service';

@Component({
  selector: 'app-dlg-exchange-voucher',
  templateUrl: './dlg-exchange-voucher.component.html',
  styleUrls: ['./dlg-exchange-voucher.component.less']
})
export class DlgExchangeVoucherComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DlgExchangeVoucherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
