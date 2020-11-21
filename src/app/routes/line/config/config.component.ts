import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-line-config',
  templateUrl: './config.component.html',
})
export class LineConfigComponent implements OnInit {
  i: any = {};
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '别名', description: '线路别名' },
      speed: { type: 'number', title: '速度', default: 80, description: '车辆行驶速度（km/h）' },
      interval: { type: 'number', title: '间隔', default: 30, description: '定位上报间隔（秒）' },
      note: { type: 'string', title: '备注' },
    },
    required: ['name', 'speed', 'interval'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
    $note: {
      widget: 'textarea',
      autosize: { minRows: 4, maxRows: 6 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {}

  save(value: any) {
    this.modal.close(value);
  }

  close() {
    this.modal.destroy();
  }
}
