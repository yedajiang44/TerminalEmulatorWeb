import { Component } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { of, zip } from 'rxjs';
import { distinct, filter, flatMap, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-terminal-list-edit',
  templateUrl: './import.component.html',
})
export class TerminalListImportComponent {
  schema: SFSchema = {
    properties: {
      data: {
        type: 'string',
        title: '数据',
        description: 'sim卡号与车牌号用空格分隔',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 6, maxRows: 20 },
          placeholder: 'sim卡号 车牌号\r\nsim卡号 车牌号',
          optionalHelp: {
            text: '一个车辆信息',
          },
        },
      },
    },
    required: ['data'],
  };
  ui: SFUISchema = {};

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  save(value: any) {
    let observables = of<{ data: string }>(value).pipe(
      flatMap(({ data }) => data.split('\n')),
      filter((x) => x !== null),
      map((x) => x.trim().split(' ')),
      map(([sim, licensePlate]) => (sim && licensePlate ? { sim: sim.trim(), licensePlate: licensePlate.trim() } : null)),
      filter((x) => !!x),
      filter((x) => x.sim.length > 0 && x.licensePlate.length > 0),
      distinct((x) => x.sim),
    );
    zip(
      observables,
      observables.pipe(
        map((x) => this.http.post(`api/terminal`, x)),
        mergeMap((x) => x),
      ),
    ).subscribe(([{ licensePlate }]) => {
      this.msgSrv.success(`${licensePlate}已导入`);
    });
  }

  close() {
    this.modal.close(true);
  }
}
