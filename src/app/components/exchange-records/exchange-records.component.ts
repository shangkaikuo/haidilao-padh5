import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exchange-records',
  templateUrl: './exchange-records.component.html',
  styleUrls: ['./exchange-records.component.less']
})
export class ExchangeRecordsComponent implements OnInit {

  loading = false;
  currentPage = 1;
  exchangeRecordsList: any;
  userId = 0

  constructor(private appService: AppService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.userId) {
        this.userId = params.userId;

        this.loading = true;
        this.appService.getExchangeRecordsList(params.userId, this.currentPage).subscribe(res => {
          if (res.status === 0) {
            if (res.data.length > 0) {
              this.exchangeRecordsList = res.data;
            }
          } else {
            this.toastr.error('获取积分兑换记录失败', '', { positionClass: 'toast-bottom-center' });
          }

          this.loading = false;
        }, err => {
          this.loading = false;
        });
      }
    });
  }

  onExchangeRecordsListScroll() {
    this.loading = true;
    this.currentPage++;
    this.appService.getExchangeRecordsList(this.userId, this.currentPage).subscribe(res => {
      if (res.status === 0) {
        if (res.data.length > 0) {
          res.data.forEach(item => {
            this.exchangeRecordsList.push(item);
          });
        }
      } else {
        this.toastr.error('获取积分兑换记录失败', '', { positionClass: 'toast-bottom-center' });
      }

      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
}
