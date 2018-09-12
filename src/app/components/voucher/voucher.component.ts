import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of, interval } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DlgExchangeVoucherComponent } from '../../dialog/dlg-exchange-voucher/dlg-exchange-voucher.component';
import { AppService } from '../../services/app.service';
import { environment } from '../../../environments/environment';
import { DlgExchangeSuccessComponent } from '../../dialog/dlg-exchange-success/dlg-exchange-success.component';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class VoucherComponent {

  //#region  query params
  storeId: string;
  customerKey: string;
  mobile: string;
  totalIntegral: number;
  tableId: number;
  waiterNo: string;
  waiterName: string;
  timeStamp: string;
  tableUid: string;
  type: number = 1;
  orderNo: string;
  waiterId: string;
  userId: string;

  // 门店id：storeId=020144
  // 加密的顾客id：customerKey=4IIgUQN2f%252F2bE9fr7UdkhA%253D%253D
  // 顾客手机号：mobile=15633396400
  // 总积分：totalIntegral=26242.0
  // 桌台号：tableId=1
  // 服务员帐号waiterNo=10262425
  // 服务员名（urlencode）：waiterName=%E8%8B%97%E9%92%9F%E5%8D%8E
  // 时间戳：timeStamp=1536136553.18111
  // 桌台id：tableUid=39237139EB9BB21E000163E06628F000
  // type=1
  // 订单ID：orderNo=3993F3E93FF75ADE0801844F0D13C000
  // 服务员ID：waiterId=E4581CAA4C000000B00000000014B00F
  // 不加密的用户ID：userId=1-12959243514
  //#endregion

  title = 'haidilao-padh5';
  // TODO: 
  isMainPointsPage = true;


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

    // TODO:
    // this.userId = '200214';
    // this.storeId = '040503';
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['storeId']) {
        this.storeId = params['storeId'];
      }

      if (params['userId']) {
        this.userId = params['userId'];
      }

      if (this.storeId && this.userId) {
        let data = { storeId: this.storeId, userId: this.userId };
        window.sessionStorage.setItem('HDL_DATA', JSON.stringify(data));
      } else {
        let data = window.sessionStorage.getItem('HDL_DATA');
        if (data) {
          data = JSON.parse(data);
          this.storeId = data['storeId'];
          this.userId = data['userId'];
        }
      }

      this.initData();
    });
  }

  initData() {
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
    // this.router.navigate(['exchange-records'], { queryParams: { userId: this.userId } });
    this.router.navigate(['/exchange-records/200214']);
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
    const dialogRef = this.dialog.open(DlgExchangeVoucherComponent, {
      width: '300px',
      data: item
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.appService.exchangeVoucher(item.activityId, item.storeId, this.userId).subscribe(r => {
          if (r.status === 0) {
            this.exchangeSuccess(item);

            this.initData();
            this.toastr.success('兑换成功', '', { positionClass: 'toast-bottom-center' });
          } else {
            this.toastr.error(r.msg, '', { positionClass: 'toast-bottom-center' });
            this.loading = false;
          }

          // this.loading = false;
        }, e => {
          this.loading = false;
        });
      }
    }, err => {
    });
  }

  exchangeSuccess(item: any) {
    const dialogRef = this.dialog.open(DlgExchangeSuccessComponent, {
      width: '300px',
      data: item
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.toastr.success('敬请期待', '', { positionClass: 'toast-bottom-center' });
      }
    }, err => {
    });
  }
}
