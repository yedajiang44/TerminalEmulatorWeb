import { Component, OnDestroy, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AMapLoaderService } from 'ngx-amap';
import { interval, Subscription, timer } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import gcoord from 'gcoord';

//TODO: 跳转地图监控页，页面元素包含地图显示终端当前位置、修改终端速度、修改终端状态、修改终端报警等操作
@Component({
  selector: 'app-task-map',
  templateUrl: './map.component.html',
  providers: [AMapLoaderService],
})
export class MapComponent implements OnDestroy {
  i: any = {};
  map: AMap.Map;
  locations: AMap.Marker[] = [];
  clear: boolean = false;
  subscription: Subscription;
  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}
  onMapReady(map: AMap.Map) {
    this.map = map;
    this.subscription = interval(this.i.interval * 1000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.get(`api/task/location/${this.i.id}`)),
        filter((x) => x != null),
      )
      .subscribe((x: any) => {
        const data = gcoord.transform([x.longitude / 10e5, x.latitude / 10e5], gcoord.WGS84, gcoord.GCJ02);
        this.updateLocations(new AMap.Marker({ position: new AMap.LngLat(data[0], data[1], true) }));
      });
  }
  close() {
    this.modal.destroy();
  }
  updateLocations(marker: AMap.Marker) {
    let location = marker.getPosition();
    let tmp = this.locations[this.locations.length - 1]?.getPosition();
    if (tmp != null && location.getLat() == tmp.getLat() && location.getLng() == tmp.getLng()) return;
    if (this.clear) this.locations = [];
    this.locations.push(marker);
    this.map.panTo(marker.getPosition());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
