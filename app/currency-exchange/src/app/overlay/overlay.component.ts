import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  public enableGraph: boolean = false;
  public conversionInProgress: boolean = false
  public convertedRate: number = 0;
  public selectedCurrency1: string = '';
  public selectedCurrency2: string = '';
  public quantity: string = '';
  public options1: any;
  public options2: any;

  ngOnInit(): void {
    this.apiService.getCurrencyList().subscribe((data) => {
      const transformedArray = Object.entries(data.currencies).map(([code, name]) => ({ code, name }));
      this.options1 = transformedArray;
      this.options2 = transformedArray;
    });
  }

  getHistoricalData(): void {
    this.enableGraph = true
  }

  getConversionRate(currencyConvertFrom: string, currencyConvertTo: string, quantity: string): void {
    this.conversionInProgress = true
    this.apiService.getExchangeRates(currencyConvertFrom, currencyConvertTo, '2').subscribe((data) => {
      this.convertedRate = data.result
    });
  }

  filterOptions1(): { code: string, name: string }[] {
    return this.options1 ? this.options1.filter((option: { code: string, name: string }) => option.code !== this.selectedCurrency2) : [];
  }

  filterOptions2(): { code: string, name: string }[] {
    return this.options2 ? this.options2.filter((option: { code: string, name: string }) => option.code !== this.selectedCurrency1) : [];
  }
}
