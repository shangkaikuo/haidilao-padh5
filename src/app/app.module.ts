import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatDialogModule, MatTabsModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingModule } from 'ngx-loading';
import { DlgExchangeVoucherComponent } from './dialog/dlg-exchange-voucher/dlg-exchange-voucher.component';
import { ToastrModule } from 'ngx-toastr';
import { DlgExchangeSuccessComponent } from './dialog/dlg-exchange-success/dlg-exchange-success.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { ExchangeRecordsComponent } from './components/exchange-records/exchange-records.component';
import { VoucherComponent } from './components/voucher/voucher.component';

@NgModule({
  declarations: [
    AppComponent,
    DlgExchangeVoucherComponent,
    DlgExchangeSuccessComponent,
    ExchangeRecordsComponent,
    VoucherComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([]),
    NoopAnimationsModule,
    MatCardModule,
    InfiniteScrollModule,
    LoadingModule,
    MatDialogModule,
    MatTabsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  entryComponents: [
    AppComponent,
    DlgExchangeVoucherComponent,
    DlgExchangeSuccessComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
