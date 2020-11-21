import { Component, OnInit } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { AmapAutocompleteService, AMapLoaderService, AmapPluginLoaderService } from 'ngx-amap';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
})
export class TaskListComponent implements OnInit {
  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {}

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
