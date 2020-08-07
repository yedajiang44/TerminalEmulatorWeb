import { Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TerminalListEditComponent } from './edit/edit.component';
import { TerminalRandomComponent } from './random/random.component';
import { TerminalListViewComponent } from './view/view.component';

@Component({
  selector: 'app-terminal-list',
  templateUrl: './list.component.html',
})
export class TerminalListComponent implements OnInit {
  url = `api/terminal/Search`;
  ids: string[] = [];
  searchSchema: SFSchema = {
    properties: {
      sim: {
        type: 'string',
        title: 'Sim卡号',
      },
      licensePlate: {
        type: 'string',
        title: '车牌',
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'checkbox' },
    { title: 'Sim卡号', index: 'sim' },
    { title: '车牌号', index: 'licensePlate' },
    { title: '创建时间', type: 'date', index: 'createDateTime', sort: true },
    {
      title: '操作',
      buttons: [
        { text: '查看', type: 'modal', modal: { component: TerminalListViewComponent }, click: (item: any) => `/view/${item.id}` },
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: TerminalListEditComponent,
          },
          click: 'reload',
        },
        { text: '删除', type: 'del', click: (item: any) => this.delete(item.id) },
      ],
    },
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService) {}

  ngOnInit() {}
  change(e: STChange) {
    if (e.type === 'checkbox') {
      this.ids = e.checkbox.map((i) => i.id);
    }
  }
  showAddForm() {
    this.modal.createStatic(TerminalListEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
  }

  showRandomForm() {
    this.modal.createStatic(TerminalRandomComponent).subscribe(() => this.st.reload());
  }

  delete(id: string) {
    this.http.delete(`api/terminal/${id}`).subscribe((res) => {
      if (res) {
        this.message.success('删除成功');
        this.st.reload();
      } else {
        this.message.error('删除失败');
      }
    });
  }
  batchDelete() {
    this.http.delete(`api/terminal`, { ids: this.ids }).subscribe((res) => {
      if (res) {
        this.message.success('删除成功');
        this.ids = [];
        this.st.reload();
      } else {
        this.message.error('删除失败');
      }
    });
  }
}
