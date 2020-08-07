import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalListComponent } from './list/list.component';

const routes: Routes = [{ path: 'list', component: TerminalListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminalRoutingModule {}
