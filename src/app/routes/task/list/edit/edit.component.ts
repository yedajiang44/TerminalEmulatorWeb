import { Component, OnInit } from '@angular/core';
import { SFSchema, SFSchemaEnum, SFSchemaEnumType, SFSelectWidgetSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';

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
          serverSearch: true,
          searchDebounceTime: 300,
          searchLoadingText: '搜索中...',

          onSearch: (q) => {
            return this.http
              .get(`api/line/Search?index=1&size=20&name=${q}`)
              .pipe(map((res) => (res.list as any[]).map((i) => ({ label: i.name, value: i.id } as SFSchemaEnum))))
              .toPromise();
          },
        } as SFSelectWidgetSchema,
      },
      status: { type: 'integer', enum: this.status, title: '状态', ui: { widget: 'select' } },
    },
    required: ['name', 'lineId', 'status'],
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
      this.http.put(`api/task`, { id: this.record.id, ...value }).subscribe((res) => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      delete value.id;
      this.http.post(`api/task`, value).subscribe((res) => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
