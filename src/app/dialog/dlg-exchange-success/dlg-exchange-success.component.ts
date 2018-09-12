import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Voucher } from '../../services/app.service';

@Component({
  selector: 'app-dlg-exchange-success',
  templateUrl: './dlg-exchange-success.component.html',
  styleUrls: ['./dlg-exchange-success.component.less']
})
export class DlgExchangeSuccessComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DlgExchangeSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
