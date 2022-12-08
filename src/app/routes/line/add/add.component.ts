import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { AMapLoaderService } from 'ngx-amap';
import { LineConfigComponent } from '../config/config.component';
import { AddType, LocationType } from '../model';
import gcoord from 'gcoord';

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

  pos: AMap.Marker[] = [];

  order: number = 0;

  addtype: AddType = AddType.auto;

  start: AMap.LocationValue;

  end: AMap.LocationValue;

  formData: { distance: number; locations: LocationType[] } = { distance: 0, locations: [] };

  constructor(
    public http: _HttpClient,
    private messageSrvice: NzMessageService,
    private modal: ModalHelper,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  search() {
    switch (this.addtype) {
      case AddType.auto:
        this.driving.search(
          [
            { keyword: document.querySelector<HTMLInputElement>('#start').value },
            { keyword: document.querySelector<HTMLInputElement>('#end').value },
          ],
          (status: AMap.Driving.SearchStatus, result: AMap.Driving.SearchResultExt) => {
            this.formData.locations = [];
            let index = 0;
            switch (status) {
              case 'complete':
                this.formData.locations = this.conversionCoordinate(result.routes);
                break;
            }
            this.changeDetectorRef.markForCheck();
            this.changeDetectorRef.detectChanges();
          },
        );
        break;
      case AddType.semiautomatic:
        this.driving.search(this.start, this.end, (status: AMap.Driving.SearchStatus, result: AMap.Driving.SearchResultBase) => {
          this.formData.locations = [];
          let index = 0;
          switch (status) {
            case 'complete':
              this.formData.locations = this.conversionCoordinate(result.routes);
              break;
          }
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        });
        break;
    }
  }

  showAddForm() {
    this.modal.createStatic(LineConfigComponent).subscribe((value) => {
      if (this.addtype == AddType.manual)
        this.formData.locations = this.pos.map<LocationType>((x) => {
          //转换坐标系至wgs84
          const [logintude, latitude] = gcoord.transform([x.getPosition().getLng(), x.getPosition().getLat()], gcoord.AMap, gcoord.WGS84);
          return { Order: Number(x.getLabel().content), Logintude: logintude, Latitude: latitude };
        });
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
    switch (this.addtype) {
      case AddType.auto:
        document.querySelector<HTMLInputElement>('#start').value = '';
        document.querySelector<HTMLInputElement>('#end').value = '';
        this.formData.locations = [];
        this.driving.clear();
        break;
      case AddType.semiautomatic:
        this.start = null;
        this.end = null;
        this.formData.locations = [];
        this.driving.clear();
        break;
      case AddType.manual:
        this.order = 0;
        this.pos = [];
        break;
    }
  }
  onMapReady(map: AMap.Map) {
    map.getContainer().style.height = `${window.outerHeight * 0.618}px`;
    map.plugin('AMap.Driving', () => {
      this.driving = new AMap.Driving({
        map,
      });
    });
    this.map = map;
  }
  onAddTypeChange(e: NzTabChangeEvent) {
    this.addtype = e.index;
    this.pos = [];
    this.start = null;
    this.end = null;
    this.driving.clear();
    this.formData.locations = [];
  }
  onMapClick(e: any) {
    switch (this.addtype) {
      case AddType.semiautomatic:
        if (this.start == null) {
          this.start = e.lnglat;
        } else if (this.end == null) {
          this.end = e.lnglat;
        }
        break;
      case AddType.manual:
        this.pos.push(
          new AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png',
            position: [e.lnglat.lng, e.lnglat.lat],
            label: {
              content: `${this.order++}`,
              direction: 'top',
            },
          }),
        );
        break;
      default:
        break;
    }
  }
  private conversionCoordinate(routes: AMap.Driving.DriveRoute[]): LocationType[] {
    let index = 0;
    return routes
      .map((x) => {
        this.formData.distance = x.distance;
        return x;
      })
      .map((x) => x.steps)
      .map((x) => x.map((item) => item.path).reduce((pre, cur) => pre.concat(cur)))
      .reduce((pre, cur) => pre.concat(cur))
      .map<LocationType>((x) => {
        //转换坐标系至wgs84
        const [logintude, latitude] = gcoord.transform([x.getLng(), x.getLat()], gcoord.AMap, gcoord.WGS84);
        return {
          Order: index++,
          Logintude: logintude,
          Latitude: latitude,
        };
      });
  }
}
