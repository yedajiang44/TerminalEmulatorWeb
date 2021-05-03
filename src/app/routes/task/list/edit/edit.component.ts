import { Component, OnInit } from '@angular/core';
import { SFSchema, SFSchemaEnum, SFSchemaEnumType, SFSelectWidgetSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-terminal-list-edit',
  templateUrl: './edit.component.html',
})
export class TaskListEditComponent implements OnInit {
  record: any = {};
  i: any;
  status: SFSchemaEnumType[] = [
    { label: '启动', value: 0, checked: true },
    { label: '开始', value: 1 },
    { label: '运行', value: 2 },
    { label: '结束', value: 3 },
  ];
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称', maxLength: 11 },
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
      simNumber: {
        type: 'string',
        title: '终端',
        ui: {
          widget: 'select',
          placeholder: '请输入车牌',
          serverSearch: true,
          searchDebounceTime: 300,
          searchLoadingText: '搜索中...',

          onSearch: (q) =>
            this.http
              .get(`api/Terminal/Search?index=1&size=20&licensePlate=${q}`)
              .pipe(
                map((res) =>
                  (res.list as any[]).map((i) => ({ label: `车牌号:${i.licensePlate}，SIM卡号：${i.sim}`, value: i.sim } as SFSchemaEnum)),
                ),
              )
              .toPromise(),
        } as SFSelectWidgetSchema,
      },
      ip: { type: 'string', title: '服务器' },
      port: { type: 'number', title: '端口' },
      speed: { type: 'number', title: '行驶速度', default: 80 },
      interval: { type: 'number', title: '定位间隔', default: 30, ui: { optionalHelp: '实时定位上报间隔，单位秒' } },
      status: { type: 'integer', enum: this.status, title: '状态', ui: { widget: 'select', hidden: true } },
    },
    required: ['name', 'lineId', 'simNumber', 'ip', 'port', 'speed', 'interval', 'status'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.record.id) {
      this.http.get(`api/task/${this.record.id}`).subscribe((res) => (this.i = res));
    }
  }

  save(value: any) {
    if (this.record.id) {
      this.http
        .put(`api/task`, { id: this.record.id, ...value })
        .pipe(filter((x) => x !== null))
        .subscribe((res) => {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        });
    } else {
      delete value.id;
      this.http
        .post(`api/task`, value)
        .pipe(filter((x) => x !== null))
        .subscribe((res) => {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        });
    }
  }

  close() {
    this.modal.destroy();
  }
}
