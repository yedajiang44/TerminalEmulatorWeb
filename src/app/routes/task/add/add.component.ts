import { Component, OnInit } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-task-add',
  templateUrl: './add.component.html',
})
export class TaskListAddComponent implements OnInit {
  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {}
}
