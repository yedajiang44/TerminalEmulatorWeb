import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JWTGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [JWTGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } },
      { path: 'task', loadChildren: () => import('./task/task.module').then((m) => m.TaskModule) },
      { path: 'line', loadChildren: () => import('./line/line.module').then((m) => m.LineModule) },
      { path: 'terminal', loadChildren: () => import('./terminal/terminal.module').then((m) => m.TerminalModule) },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) },
      { path: 'system', loadChildren: () => import('./system/system.module').then((m) => m.SystemModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ],
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
