import { Component, OnInit } from '@angular/core';
import { SFSchema, SFSchemaEnum, SFSchemaEnumType, SFSelectWidgetSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-benchmark-edit',
  templateUrl: './edit.component.html',
})
export class BenchmarkEditComponent implements OnInit {
  schema: SFSchema = {
    properties: {
      lineId: {
        type: 'string',
        title: '线路',
        ui: {
          widget: 'select',
          placeholder: '请输入线路名称',
          serverSearch: true,
          searchDebounceTime: 300,
          searchLoadingText: '搜索中...',

          onSearch: (q) =>
            this.http
              .get(`api/line/Search?index=1&size=20&name=${q}`)
              .pipe(map((res) => (res.list as any[]).map((i) => ({ label: i.name, value: i.id } as SFSchemaEnum))))
              .toPromise(),
        } as SFSelectWidgetSchema,
      },
      type: {
        type: 'number',
        title: '循环类型',
        ui: {
          widget: 'select',
          placeholder: '请输入循环类型',
          serverSearch: true,
          searchDebounceTime: 300,
          searchLoadingText: '搜索中...',

          onSearch: (q) =>
            this.http
              .get(`api/task/type/typeSearch/${q}`)
              .pipe(map((res) => (res as any[]).map((i) => ({ label: i.description, value: i.value } as SFSchemaEnum))))
              .toPromise(),
        } as SFSelectWidgetSchema,
      },
      ip: { type: 'string', title: '服务器' },
      port: { type: 'number', title: '端口' },
      speed: { type: 'number', title: '行驶速度', default: 80 },
      interval: { type: 'number', title: '定位间隔', default: 30, ui: { optionalHelp: '实时定位上报间隔，单位秒' } },
    },
    required: ['name', 'lineId', 'ip', 'port', 'speed', 'interval'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {}

  save(value: any) {
    this.http
      .get(`api/benchmark`, value)
      .pipe(filter((x) => x !== null))
      .subscribe((res) => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
  }

  close() {
    this.modal.destroy();
  }
}
