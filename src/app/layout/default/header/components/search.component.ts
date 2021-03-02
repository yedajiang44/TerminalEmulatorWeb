import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'header-search',
  template: `
    <nz-input-group [nzPrefix]="iconTpl" [nzSuffix]="loadingTpl">
      <ng-template #iconTpl>
        <i nz-icon [nzType]="focus ? 'arrow-down' : 'search'"></i>
      </ng-template>
      <ng-template #loadingTpl>
        <i *ngIf="loading" nz-icon nzType="loading"></i>
      </ng-template>
      <input
        type="text"
        nz-input
        [(ngModel)]="q"
        [nzAutocomplete]="auto"
        (input)="search($event)"
        (focus)="qFocus()"
        (blur)="qBlur()"
        [attr.placeholder]="'menu.search.placeholder' | translate"
      />
    </nz-input-group>
    <nz-autocomplete nzBackfill #auto>
      <nz-auto-option *ngFor="let i of options" [nzValue]="i" [nzLabel]="i.value">
        <a target="_blank" [href]="i.link" nz-row>
          {{ i.label }}
        </a>
      </nz-auto-option>
    </nz-autocomplete>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSearchComponent implements AfterViewInit, OnDestroy {
  q: string;
  qIpt: HTMLInputElement;
  options: { label: string; value: string; link: string }[] = [];
  search$ = new BehaviorSubject('');
  loading = false;

  @HostBinding('class.alain-default__search-focus')
  focus = false;
  @HostBinding('class.alain-default__search-toggled')
  searchToggled = false;

  @Input()
  set toggleChange(value: boolean) {
    if (typeof value === 'undefined') {
      return;
    }
    this.searchToggled = true;
    this.focus = true;
    setTimeout(() => this.qIpt.focus(), 300);
  }

  constructor(private el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.qIpt = this.el.nativeElement.querySelector('.ant-input') as HTMLInputElement;
    this.search$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      this.options = value
        ? [
            { label: '必应搜索', value, link: `https://cn.bing.com/search?q=${value}` },
            { label: '百度搜索', value, link: `https://www.baidu.com/s?wd=${value}` },
            { label: '360搜索', value, link: `https://www.so.com/s?q=${value}` },
            { label: '搜狗搜索', value, link: `https://www.sogou.com/tx?query=${value}` },
          ]
        : [];
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  qFocus(): void {
    this.focus = true;
  }

  qBlur(): void {
    this.focus = false;
    this.searchToggled = false;
  }

  search(ev: KeyboardEvent): void {
    if (ev.key === 'Enter') {
      return;
    }
    this.loading = true;
    this.search$.next((ev.target as HTMLInputElement).value);
  }

  ngOnDestroy(): void {
    this.search$.complete();
    this.search$.unsubscribe();
  }
}
