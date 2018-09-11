import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of, interval } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DlgExchangeVoucherComponent } from '../../dialog/dlg-exchange-voucher/dlg-exchange-voucher.component';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class VoucherComponent {
  title = 'haidilao-padh5';

  // TODO: 
  isMainPointsPage = true;
  userId = 200214
  storeId = '040503';

  loading = false;
  loading_VoucherList = false;

  usablePoints = 0;
  expirePoints = 0;
  vouchers: any;
  rankings: any;
  pointsList: any;
  consumePointsList: any;
  // 来源 1就餐消费获得积分 2积分兑换 3积分转让 4积分奖励 5积分扣减 6积分抵现 7积分充值
  pointsSource = ['NONE', '就餐消费', '积分兑换', '积分转让', '积分奖励', '积分扣减', '积分抵现', '积分充值'];

  currentPage_VoucherList = 1;
  currentPage_PointsList = 1;
  currentPage_ConsumePointsList = 1;


  constructor(private activatedRoute: ActivatedRoute, private appService: AppService, public dialog: MatDialog,
    private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let x = params['a'];
      // alert('a = ' + x);
    });

    this.loading = true;
    forkJoin(this.appService.getUsablePoints(this.userId).pipe(catchError(error => of(error))),
      this.appService.getExpirePoints(this.userId).pipe(catchError(error => of(error))),
      this.appService.getVoucherList(this.storeId, 1, 50).pipe(catchError(error => of(error))),
      this.appService.getRankingList(this.storeId, 50).pipe(catchError(error => of(error))))
      .subscribe(([usablePointsRes, expirePointsRes, voucherListRes, rankingListRes]) => {
        if (usablePointsRes.status === 0) {
          this.usablePoints = usablePointsRes.data;
        } else {
          this.toastr.error('获取可用积分失败', '', { positionClass: 'toast-bottom-center' });
        }

        if (expirePointsRes.status === 0) {
          this.expirePoints = expirePointsRes.data;
        } else {
          this.toastr.error('获取即将过期积分失败', '', { positionClass: 'toast-bottom-center' });
        }

        if (voucherListRes.status === 0) {
          this.vouchers = voucherListRes.data;
        } else {
          this.toastr.error('获取菜品券失败', '', { positionClass: 'toast-bottom-center' });
        }

        if (rankingListRes.status === 0) {
          this.rankings = rankingListRes.data;
        } else {
          this.toastr.error('获取排行榜失败', '', { positionClass: 'toast-bottom-center' });
        }

        this.loading = false;
      }, err => {
        this.loading = false;
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      });
  }

  onPointsDetail() {
    this.isMainPointsPage = false;

    this.loading = true;
    forkJoin(this.appService.getUsablePoints(this.userId).pipe(catchError(error => of(error))),
      this.appService.getExpirePoints(this.userId).pipe(catchError(error => of(error))),
      this.appService.retrievePointsList(this.userId, 1).pipe(catchError(error => of(error))),
      this.appService.retrieveConsumePointsList(this.userId, 1).pipe(catchError(error => of(error))))
      .subscribe(([usablePointsRes, expirePointsRes, pointsListRes, consumePointsListRes]) => {
        if (usablePointsRes.status === 0) {
          this.usablePoints = usablePointsRes.data;
        } else {
          this.toastr.error('获取可用积分失败', '', { positionClass: 'toast-bottom-center' });
        }

        if (expirePointsRes.status === 0) {
          this.expirePoints = expirePointsRes.data;
        } else {
          this.toastr.error('获取即将过期积分失败', '', { positionClass: 'toast-bottom-center' });
        }

        if (pointsListRes.status === 0) {
          this.pointsList = pointsListRes.data;
        } else {
          this.toastr.error('获取积分列表失败', '', { positionClass: 'toast-bottom-center' });
        }

        if (consumePointsListRes.status === 0) {
          this.consumePointsList = consumePointsListRes.data;
        } else {
          this.toastr.error('获取消耗积分列表失败', '', { positionClass: 'toast-bottom-center' });
        }

        this.loading = false;
      }, err => {
        this.loading = false;
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      });
  }

  onExchangeRecords() {
    this.router.navigate(['exchange-records'], { queryParams: { userId: this.userId } });
  }

  onVoucherListScroll($event) {
    this.loading_VoucherList = true;
    this.currentPage_VoucherList++;
    this.appService.getVoucherList(this.storeId, this.currentPage_VoucherList).subscribe(res => {
      if (res.status === 0) {
        if (res.data.length > 0) {
          res.data.forEach(item => {
            this.vouchers.push(item);
          });
        }
      } else {
        this.toastr.error('获取菜品券失败', '', { positionClass: 'toast-bottom-center' });
      }

      this.loading_VoucherList = false;
    }, err => {
      this.loading_VoucherList = false;
    });
  }

  onPointsListScroll($event) {
    this.loading = true;
    this.currentPage_PointsList++;
    this.appService.retrievePointsList(this.userId, this.currentPage_PointsList).subscribe(res => {
      if (res.status === 0) {
        if (res.data.length > 0) {
          res.data.forEach(item => {
            this.pointsList.push(item);
          });
        }
      } else {
        this.toastr.error('获取积分列表失败', '', { positionClass: 'toast-bottom-center' });
      }

      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  onConsumePointsListScroll($event) {
    this.loading = true;
    this.currentPage_ConsumePointsList++;
    this.appService.retrieveConsumePointsList(this.userId, this.currentPage_ConsumePointsList).subscribe(res => {
      if (res.status === 0) {
        if (res.data.length > 0) {
          res.data.forEach(item => {
            this.consumePointsList.push(item);
          });
        }
      } else {
        this.toastr.error('获取消耗积分列表失败', '', { positionClass: 'toast-bottom-center' });
      }

      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  onExchangeVocuher(item: any) {
    this.toastr.info('Hello world!', '', { positionClass: 'toast-bottom-center' });
    const dialogRef = this.dialog.open(DlgExchangeVoucherComponent, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if (result) {
        // TODO: exchange voucher
        console.log(result);
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      }
    });
  }
}
