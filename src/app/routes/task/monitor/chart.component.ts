import { Component, OnDestroy, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-task-monitor-chart',
  templateUrl: './chart.component.html',
})
export class MonitorChartComponent implements OnInit, OnDestroy {
  options: any;
  updateOptions: any;

  dataMaxLength = 300;

  private data: { name: string; value: (number | string)[] }[];
  private timer: any;

  constructor(private http: _HttpClient) {}

  ngOnInit(): void {
    // generate some random testing data:
    this.data = [];

    // initialize chart options:
    this.options = {
      title: {
        text: '链路',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          params = params[0];
          return params.name + '时在线数：' + params.value[1];
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Mocking Data',
          type: 'line',
          showSymbol: false,
          emphasis: {
            line: false,
          },
          data: this.data,
        },
      ],
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      this.http
        .get('api/session/count')
        .pipe(filter((x) => x !== null))
        .subscribe((x: number) => {
          let now = new Date();
          let date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
          let time = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');
          for (; this.data.length - this.dataMaxLength > 0; ) this.data.shift();
          this.data.push({ name: time, value: [date + ' ' + time, x] });
        });
      // update series data:
      this.updateOptions = {
        series: [
          {
            data: this.data,
          },
        ],
      };
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
