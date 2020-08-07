import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-terminal-list-view',
  templateUrl: './view.component.html',
})
export class TerminalListViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(private modal: NzModalRef, public msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    this.http.get(`api/terminal/${this.record.id}`).subscribe((res) => (this.i = res.data));
  }

  close() {
    this.modal.destroy();
  }
}
