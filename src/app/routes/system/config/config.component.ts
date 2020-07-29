import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SystemConfigEditComponent } from './edit/edit.component';
import { SystemConfigViewComponent } from './view/view.component';

@Component({
  selector: 'app-system-config',
  templateUrl: './config.component.html',
})
export class SystemConfigComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        { text: '查看', type: 'modal', modal: { component: SystemConfigViewComponent }, click: (item: any) => `/view/${item.id}` },
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SystemConfigEditComponent,
          },
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService) {}

  ngOnInit() {}

  add() {
    this.modal.createStatic(SystemConfigEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
  }
}
