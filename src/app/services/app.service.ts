import { Injectable } from '@angular/core';
import { from, of, Observable } from 'rxjs';
import { mapTo, delay, merge, map, shareReplay } from 'rxjs/operators';
import { concatMap } from 'rxjs/internal/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { base_url } from '../base-url';
import { Guid } from '../common/create-guid';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  // 菜品券列表
  getVoucherList(storeId: string, page: number = 1, size: number = 50): Observable<any> {
    // // TODO: need to be removed once get real data
    // let mockVouchers = [{ itemName: '捞派滑牛肉（半份）', exchangeUserCount: '0', exchangeStatus: '未售罄', consumeLaoCoinNum: '500' },
    // { itemName: '冬瓜（半份）', exchangeUserCount: '0', exchangeStatus: '未售罄', consumeLaoCoinNum: '500' },
    // { itemName: '海底捞经典大麦啤酒2份', exchangeUserCount: '0', exchangeStatus: '未售罄', consumeLaoCoinNum: '500' },
    // { itemName: '黄金针菇（半份）', exchangeUserCount: '0', exchangeStatus: '未售罄', consumeLaoCoinNum: '500' },
    // { itemName: '捞派滑牛肉（半份）', exchangeUserCount: '0', exchangeStatus: '未售罄', consumeLaoCoinNum: '500' },
    // { itemName: '冬瓜（半份）', exchangeUserCount: '0', exchangeStatus: '未售罄', consumeLaoCoinNum: '500' }
    // ];

    // for (let i = 0; i < 100; i++) {
    //   mockVouchers.push({ itemName: '冬瓜（半份）', exchangeUserCount: '0', exchangeStatus: '未售罄', consumeLaoCoinNum: '500' });
    // }

    // return of(mockVouchers).pipe(delay(3000));
    const params = new HttpParams()
      .set('storeId', storeId)
      .set('page', `${page}`)
      .set('size', `${size}`);

    return this.http
      .get<any>(base_url + "/marketing/prize/list.json", { params });
  }

  // 排行榜列表
  getRankingList(storeId: string, size: number = 10): Observable<any> {
    // // TODO: need to be removed once get real data
    // let mockRankings = [{ itemName: '海底捞经典大麦啤酒2份', consumeLaoCoinNum: '500', itemURL: 'assets/images/test-ranking-img.png' },
    // { itemName: '黄金针菇（半份）', consumeLaoCoinNum: '300', itemURL: 'assets/images/test-ranking-img.png' },
    // { itemName: '冬瓜（半份）', consumeLaoCoinNum: '200', itemURL: 'assets/images/test-ranking-img.png' }
    // ];

    // for (let i = 0; i < 100; i++) {
    //   mockRankings.push({ itemName: '黄金针菇（半份）', consumeLaoCoinNum: '300', itemURL: 'assets/images/test-ranking-img.png' });
    // }

    // return of(mockRankings);
    const params = new HttpParams()
      .set('storeId', storeId)
      .set('size', `${size}`);

    return this.http
      .get<any>(base_url + "/marketing/prize/top.json", { params });
  }

  // 获取可用积分
  getUsablePoints(userId: string): Observable<number> {
    const params = new HttpParams()
      .set('userId', userId + '');

    return this.http
      .get<number>(base_url + "/marketing/api/score/total.json", { params });
  }

  // 获取即将过期积分
  getExpirePoints(userId: string) {
    const params = new HttpParams()
      .set('userId', userId + '');

    return this.http
      .get<number>(base_url + "/marketing/api/score/expire.json", { params });
  }

  // getStoreGiftList(storeId: string, page: number = 1, size: number = 10) {
  //   const params = new HttpParams()
  //     .set('storeId', storeId + '')
  //     .set('page', page + '')
  //     .set('size', size + '');

  //   return this.http
  //     .get<number>("/marketing/activityReserve/getActivityReserve.json", { params });
  // }

  // 获取积分列表
  // 来源 1就餐消费获得积分 2积分兑换 3积分转让 4积分奖励 5积分扣减 6积分抵现 7积分充值
  retrievePointsList(userId: string, page: number = 1, size: number = 50): Observable<any> {
    const params = new HttpParams()
      .set('userId', `${userId}`)
      .set('page', `${page}`)
      .set('size', `${size}`);

    return this.http
      .get<any>(base_url + "/marketing/api/score/profile/obtain.json", { params });
    // let data = [{ type: '就餐消费1', date: '2018-08-01 10:50', count: 170 },
    // { type: '就餐消费2', date: '2018-06-01 10:50', count: 100 },
    // { type: '就餐消费3', date: '2018-12-01 10:50', count: 68 },
    // ];
    // for (let i = 0; i < 10; i++) {
    //   data.push({ type: '就餐消费1', date: '2018-08-01 10:50', count: 170 });
    // }

    // // return of(data).pipe(delay(3000));
    // return of(data);
  }

  // 获取消耗积分列表
  retrieveConsumePointsList(userId: string, page: number = 1, size: number = 50): Observable<any> {
    const params = new HttpParams()
      .set('userId', `${userId}`)
      .set('page', `${page}`)
      .set('size', `${size}`);

    return this.http
      .get<any>(base_url + "/marketing/api/score/profile/consume.json", { params });
  }

  // 获取兑换记录列表
  getExchangeRecordsList(userId: string, page: number = 1, size: number = 50): Observable<any> {
    const params = new HttpParams()
      .set('uid', `${userId}`)
      .set('page', `${page}`)
      .set('size', `${size}`);

    return this.http
      .get<any>(base_url + "/marketing/score/record.json", { params });
  }

  exchangeVoucher(activityId: string, storeId: string, uid: string): Observable<any> {
    let outTradeNo = Guid.newGuid();
    const data = {
      activityId: activityId,
      storeId: storeId,
      uid: uid,
      outTradeNo: outTradeNo
    }

    return this.http
      .post<any>(base_url + "/marketing/prize/exchange.json", JSON.stringify(data));
  }
}

export interface Voucher {
  itemName: string;
  exchangeUserCount: string;
  exchangeStatus: string;
  consumeLaoCoinNum: string;
}

export interface Ranking {
  itemName: string;
  consumeLaoCoinNum: string;
  itemURL: string;
}

export interface RetrievePoints {
  type: string;
  date: string;
  count: number;
}
