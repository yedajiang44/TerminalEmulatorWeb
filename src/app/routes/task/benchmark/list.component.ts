import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '@delon/abc/loading';
import { STChange, STColumn, STColumnTag, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';
import { MonitorChartComponent } from '../monitor/chart.component';
import { BenchmarkEditComponent } from './edit/edit.component';

const TAG: STColumnTag = {
  true: { text: '是', color: 'green' },
  false: { text: '否', color: 'red' },
};

@Component({
  selector: 'app-benchmark-list',
  templateUrl: './list.component.html',
})
export class BenchmarkListComponent {
  url = `api/benchmark/search`;
  ids: string[] = [];
  searchSchema: SFSchema = {
    properties: {
      licensePlate: {
        type: 'string',
        title: '车牌号',
        minimum: 0,
      },
      sim: {
        type: 'string',
        title: 'sim卡号',
        minimum: 0,
      },
      onlineState: {
        type: 'number',
        title: '状态',
        default: 0,
        enum: [
          { label: '所有', value: 0 },
          { label: '在线', value: 1 },
          { label: '离线', value: 2 },
        ],
      },
    },
  };

  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    // { title: '编号', index: 'simNumber', type: 'checkbox' },
    { title: '车牌号', index: 'licensePlate' },
    { title: 'sim卡号', index: 'simNumber' },
    { title: '在线', index: 'online', type: 'tag', tag: TAG },
    // {
    //   title: '操作',
    //   buttons: [
    //     // { text: '查看', type: 'modal', modal: { component: TasklListViewComponent }, click: (item: any) => `/view/${item.id}` },
    //     {
    //       text: '编辑',
    //       type: 'modal',
    //       modal: {
    //         component: BenchmarkEditComponent,
    //       },
    //       click: 'reload',
    //     },
    //   ],
    // },
  ];
  constructor(
    private http: _HttpClient,
    private modalHelper: ModalHelper,
    private modelService: NzModalService,
    private message: NzMessageService,
    private loading: LoadingService,
  ) {}

  add() {
    this.modelService.confirm({
      nzTitle: '是否继续',
      nzContent: '<b>背压将断开现有的全部连接</b>',
      nzOkText: '继续',
      nzOnOk: () => this.modalHelper.createStatic(BenchmarkEditComponent).subscribe(() => this.st.reload()),
    });
  }

  stop() {
    this.http
      .get('api/benchmark/stop')
      .pipe(filter((x) => x !== null))
      .subscribe((res) => {
        this.message.success('操作成功');
        this.st.reload();
      });
  }

  monitor() {
    this.modalHelper.createStatic(MonitorChartComponent).subscribe(() => this.st.reload());
  }

  change(e: STChange) {
    if (e.type === 'checkbox') {
      this.ids = e.checkbox.map((i) => i.id);
    }
  }
}
