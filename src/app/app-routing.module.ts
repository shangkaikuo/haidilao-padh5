import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExchangeRecordsComponent } from './components/exchange-records/exchange-records.component';
import { VoucherComponent } from './components/voucher/voucher.component';

const routes: Routes = [
  { path: ':folder', component: VoucherComponent ,pathMatch: 'full'},
  { path: 'exchange-records/:userId', component: ExchangeRecordsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
