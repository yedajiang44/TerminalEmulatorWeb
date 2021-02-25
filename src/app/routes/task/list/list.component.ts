import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '@delon/abc/loading';
import { STChange, STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskListEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
})
export class TaskListComponent implements OnInit {
  url = `api/task/Search`;
  ids: string[] = [];
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '任务别名',
        minimum: 0,
      },
      lineName: {
        type: 'string',
        title: '线路别名',
        minimum: 0,
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'checkbox' },
    { title: '别名', index: 'name' },
    { title: 'sim卡号', index: 'simNumber' },
    { title: '线路', index: 'lineName' },
    { title: '服务器', index: 'ip' },
    { title: '端口', index: 'port' },
    { title: '定位间隔', index: 'interval', format: (x) => `${x.interval} 秒` },
    { title: '行驶速度', index: 'speed', format: (x) => `${x.speed} km/h` },
    { title: '创建时间', type: 'date', index: 'createDateTime', sort: true },
    {
      title: '操作',
      buttons: [
        // { text: '查看', type: 'modal', modal: { component: TasklListViewComponent }, click: (item: any) => `/view/${item.id}` },
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: TaskListEditComponent,
          },
          click: 'reload',
        },
        { text: '开始', click: (item: any) => this.start(item.id) },
        { text: '停止', click: (item: any) => this.stop(item.id) },
        { text: '删除', type: 'del', click: (item: any) => this.delete(item.id) },
      ],
    },
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService, private loading: LoadingService) {}

  ngOnInit() {}
  change(e: STChange) {
    if (e.type === 'checkbox') {
      this.ids = e.checkbox.map((i) => i.id);
    }
  }

  add() {
    this.modal.createStatic(TaskListEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
  }

  start(id: string) {
    this.http.get(`api/task/start/${id}`).subscribe((res) => {
      this.message.success('任务已开始');
    });
  }

  stop(id: string) {
    this.http.get(`api/task/stop/${id}`).subscribe((res) => {
      this.message.success('任务已停止');
    });
  }

  delete(id: string) {
    this.http.delete(`api/task/${id}`).subscribe((res) => {
      if (res) {
        this.message.success('删除成功');
        this.st.reload();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  batchDelete() {
    this.http.delete(`api/task`, { ids: this.ids }).subscribe((res) => {
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
