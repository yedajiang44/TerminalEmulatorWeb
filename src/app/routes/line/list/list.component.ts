import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '@delon/abc/loading';
import { STChange, STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-line-list',
  templateUrl: './list.component.html',
})
export class LineListComponent implements OnInit {
  url = `api/line/Search`;
  ids: string[] = [];
  searchSchema: SFSchema = {
    properties: {
      interval: {
        type: 'number',
        title: '定位间隔',
        minimum: 0,
      },
      speed: {
        type: 'number',
        title: '速度',
        minimum: 0,
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id', type: 'checkbox' },
    { title: '别名', index: 'name' },
    { title: '距离', index: 'distance', format: (x) => `${x.distance / 1000} km` },
    { title: '基准点', index: 'locationCount', format: (x) => `${x.locationCount} 个` },
    { title: '备注', index: 'note' },
    { title: '创建时间', type: 'date', index: 'createDateTime', sort: true },
    {
      title: '操作',
      buttons: [{ text: '删除', type: 'del', click: (item: any) => this.delete(item.id) }],
    },
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService, private loading: LoadingService) {}

  ngOnInit() {}
  change(e: STChange) {
    if (e.type === 'checkbox') {
      this.ids = e.checkbox.map((i) => i.id);
    }
  }

  delete(id: string) {
    this.http.delete(`api/line/${id}`).subscribe((res) => {
      if (res) {
        this.message.success('删除成功');
        this.st.reload();
      } else {
        this.message.error('删除失败');
      }
    });
  }

  batchDelete() {
    this.http.delete(`api/line`, { ids: this.ids }).subscribe((res) => {
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
