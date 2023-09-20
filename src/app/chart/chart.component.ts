import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges  {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() from: string;
  @Input() to: string;

  public lineChartData: ChartConfiguration['data'];
  public keys: string[] = [];
  public values: number[] = [];
  public data: any;
  public lineChartType: ChartType = 'line';
  public noHistory: boolean = false
  public historicalData = {
    "EUR/USD": {
      "Sep 18, 2023": 1.0680,
      "Sep 17, 2023": 1.0668,
      "Sep 15, 2023": 1.0655,
      "Sep 14, 2023": 1.0641,
      "Sep 13, 2023": 1.0728,
      "Sep 12, 2023": 1.0752,
      "Sep 11, 2023": 1.0748,
      "Sep 08, 2023": 1.0699,
      "Sep 07, 2023": 1.0699,
      "Sep 06, 2023": 1.0727,
      "Sep 05, 2023": 1.0720,
      "Sep 04, 2023": 1.0794,
      "Sep 01, 2023": 1.0773,
      "Aug 31, 2023": 1.0841,
      "Aug 30, 2023": 1.0924,
      "Aug 29, 2023": 1.0877,
      "Aug 28, 2023": 1.0817,
      "Aug 25, 2023": 1.0800,
      "Aug 24, 2023": 1.0809,
      "Aug 23, 2023": 1.0859,
      "Aug 22, 2023": 1.0844,
      "Aug 21, 2023": 1.0891
    },
    "GBP/USD": {
      "Sep 18, 2023": 1.2396,
      "Sep 17, 2023": 1.2398,
      "Sep 15, 2023": 1.2389,
      "Sep 14, 2023": 1.2409,
      "Sep 13, 2023": 1.2488,
      "Sep 12, 2023": 1.2484,
      "Sep 11, 2023": 1.2509,
      "Sep 08, 2023": 1.2464,
      "Sep 07, 2023": 1.2473,
      "Sep 06, 2023": 1.2505,
      "Sep 05, 2023": 1.2563,
      "Sep 04, 2023": 1.2621,
      "Sep 01, 2023": 1.2588,
      "Aug 31, 2023": 1.2673,
      "Aug 30, 2023": 1.2718,
      "Aug 29, 2023": 1.2638,
      "Aug 28, 2023": 1.2603,
      "Aug 25, 2023": 1.2577,
      "Aug 24, 2023": 1.2599,
      "Aug 23, 2023": 1.2726,
      "Aug 22, 2023": 1.2730,
      "Aug 21, 2023": 1.2754
    },
    "USD/INR": {
      "Sep 18, 2023": 83.279,
      "Sep 17, 2023": 83.086,
      "Sep 15, 2023": 83.069,
      "Sep 14, 2023": 83.010,
      "Sep 13, 2023": 82.934,
      "Sep 12, 2023": 82.850,
      "Sep 11, 2023": 82.900,
      "Sep 08, 2023": 83.004,
      "Sep 07, 2023": 83.150,
      "Sep 06, 2023": 83.197,
      "Sep 05, 2023": 83.033,
      "Sep 04, 2023": 82.715,
      "Sep 01, 2023": 82.689,
      "Aug 31, 2023": 82.702,
      "Aug 30, 2023": 82.607,
      "Aug 29, 2023": 82.574,
      "Aug 28, 2023": 82.600,
      "Aug 25, 2023": 82.637,
      "Aug 24, 2023": 82.580,
      "Aug 23, 2023": 82.508,
      "Aug 22, 2023": 83.040,
      "Aug 21, 2023": 83.090
    }
  }

  constructor() { }

  ngOnChanges() {
    this.noHistory = false
    this.data = this.getObjectByKey(this.historicalData, `${this.from}/${this.to}`)
    if (this.data != undefined) {
      this.setKeyValueForGraph()
    }
  }

  ngOnInit(): void {
    console.log(`${this.from}/${this.to}`)
    this.data = this.getObjectByKey(this.historicalData, `${this.from}/${this.to}`)
    if (this.data != undefined) {
      this.setKeyValueForGraph()
    }
  }

  public setKeyValueForGraph() {
    this.keys = Object.keys(this.data); // Extract keys into an array
    this.values = Object.values(this.data); // Extract values into an array
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

  public getObjectByKey(object: Record<string, any>, targetKey: string): any {
    if (object.hasOwnProperty(targetKey)) {
      return object[targetKey];
    } else {
      for (const key in object) {
        if (typeof object[key] === 'object') {
          const result = this.getObjectByKey(object[key], targetKey);
          if (result !== undefined) {
            this.noHistory = false
            return result;
          }
        }
      }
    }
    this.noHistory = true
    return undefined;
  }
}
