import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styles: [],
})
export class TerminalRandomComponent implements OnInit {
  i: any = { count: 1 };
  schema: SFSchema = {
    properties: {
      count: { type: 'integer', title: '生成数量', maxLength: 9, minLength: 1, minimum: 1 },
    },
    required: ['count'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
  };

  constructor(private modal: NzModalRef, private message: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {}

  save(value: any) {
    this.http.get(`api/terminal/random/${value.count}`).subscribe((res) => {
      this.message.success(`生成${res}条数据`);
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
