import { Inject, Injectable } from '@angular/core';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AMapLoaderService } from 'ngx-amap';
import { LoggerService } from 'ngx-amap/shared/logger/logger.service';
import { LineConfigComponent } from '../config/config.component';
import { LocationType } from '../model';

@Component({
  selector: 'app-line-add',
  templateUrl: './add.component.html',
  providers: [AMapLoaderService],
})
export class LineListAddComponent {
  /**
   * AMap.Driving needs:
   * + @types/amap-js-api-place-search
   * + @types/amap-js-api-driving
   */
  driving: AMap.Driving;

  map: AMap.Map;

  formData: { distance: number; locations: LocationType[] } = { distance: 0, locations: [] };

  constructor(
    public http: _HttpClient,
    private messageSrvice: NzMessageService,
    private modal: ModalHelper,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  search() {
    this.driving.search(
      [
        { keyword: document.querySelector<HTMLInputElement>('#start').value },
        { keyword: document.querySelector<HTMLInputElement>('#end').value },
      ],
      (status: AMap.Driving.SearchStatus, result: AMap.Driving.SearchResultExt) => {
        this.formData.locations = [];
        switch (status) {
          case 'complete':
            this.formData.locations = result.routes
              .map((x) => {
                this.formData.distance = x.distance;
                return x;
              })
              .map((x) => x.steps)
              .map((x) => x.map((item) => item.path).reduce((pre, cur) => pre.concat(cur)))
              .reduce((pre, cur) => pre.concat(cur))
              .map<LocationType>((x) => ({
                Logintude: x.getLng(),
                Latitude: x.getLat(),
              }));
            break;
          case 'error':
            break;
          case 'no_data':
            break;
        }
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
      },
    );
  }

  showAddForm() {
    this.modal.createStatic(LineConfigComponent).subscribe((value) => {
      this.http
        .post(`api/Line`, {
          ...value,
          ...this.formData,
        })
        .subscribe((res) => {
          this.messageSrvice.success('操作成功');
          this.reset();
        });
    });
  }
  reset() {
    document.querySelector<HTMLInputElement>('#start').value = '';
    document.querySelector<HTMLInputElement>('#end').value = '';
    this.formData.locations = [];
    this.driving.clear();
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }
  onMapReady(map: AMap.Map) {
    map.plugin('AMap.Driving', () => {
      this.driving = new AMap.Driving({
        map,
      });
    });
  }
}
