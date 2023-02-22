import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TerminalListEditComponent } from './list/edit/edit.component';
import { TerminalListImportComponent } from './list/import/import.component';
import { TerminalListComponent } from './list/list.component';
import { TerminalRandomComponent } from './list/random/random.component';
import { TerminalListViewComponent } from './list/view/view.component';
import { TerminalRoutingModule } from './terminal-routing.module';

const COMPONENTS = [TerminalListComponent];
const COMPONENTS_NOROUNT = [TerminalListEditComponent, TerminalListViewComponent, TerminalRandomComponent, TerminalListImportComponent];

@NgModule({
  imports: [SharedModule, TerminalRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class TerminalModule {}
