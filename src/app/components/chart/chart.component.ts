import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { historicalExchangeData } from '../../currency-exchange.constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() from: string;
  @Input() to: string;

  public lineChartData: ChartConfiguration['data'];
  public keys: string[] = [];
  public values: number[] = [];
  public lineChartType: ChartType = 'line';
  public noHistory: boolean = false;
  public historicalData = historicalExchangeData;
  public data: any;

  constructor() { }

  ngOnChanges(): void {
    this.noHistory = false;
    this.data = this.getObjectByKey(this.historicalData, `${this.from}/${this.to}`);
    if (this.data != undefined) {
      this.setKeyValueForGraph();
    }
  }

  ngOnInit(): void {
    this.data = this.getObjectByKey(this.historicalData, `${this.from}/${this.to}`);
    if (this.data != undefined) {
      this.setKeyValueForGraph();
    }
  }

  public setKeyValueForGraph(): void {
    this.keys = Object.keys(this.data);
    this.values = Object.values(this.data);
    this.lineChartData = {
      datasets: [
        {
          data: this.values.reverse(),
          label: `${this.from} - ${this.to}`,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'false',
        }
      ],
      labels: this.keys.reverse(),
    };
  }

  public getObjectByKey(object: Record<string, any>, targetKey: string): Record<string, number> | undefined {
    if (object.hasOwnProperty(targetKey)) {
      return object[targetKey];
    } else {
      for (const key in object) {
        if (typeof object[key] === 'object') {
          const result = this.getObjectByKey(object[key], targetKey);
          if (result !== undefined) {
            this.noHistory = false;
            return result;
          }
        }
      }
    }
    this.noHistory = true;
    return undefined;
  }
}
