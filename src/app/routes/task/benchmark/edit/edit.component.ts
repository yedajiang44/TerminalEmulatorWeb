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
          optionalHelp: '以线路中的定位点为基准点，并根据速度计算出上报时的位置',

          onSearch: (q) =>
            this.http
              .get(`api/line/Search?index=1&size=20&name=${q}`)
              .pipe(map((res) => (res.list as any[]).map((i) => ({ label: i.name, value: i.id }))))
              .toPromise(),
        },
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
          optionalHelp: '循环类型是指上报定位结束后如何继续的选项',
          onSearch: (q) =>
            this.http
              .get(`api/task/type/typeSearch/${q}`)
              .pipe(map((res) => (res as any[]).map((i) => ({ label: i.description, value: i.value }))))
              .toPromise(),
        },
      },
      ip: {
        type: 'string',
        title: '服务器',
        ui: { optionalHelp: '请确保api所在服务器能连接该ip' },
      },
      port: {
        type: 'number',
        title: '端口',
        ui: { optionalHelp: '请确保端口被监听并已对外开放' },
      },
      speed: {
        type: 'number',
        title: '行驶速度',
        default: 80,
        ui: { optionalHelp: '终端行驶速度，单位km/h', unit: 'km/h' },
      },
      interval: {
        type: 'number',
        title: '定位间隔',
        default: 30,
        ui: { optionalHelp: '实时定位上报间隔，单位秒', unit: 's' },
      },
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
