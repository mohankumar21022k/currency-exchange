import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent implements OnInit {  
  constructor(
    private apiService: ApiService,
    public loaderService: LoaderService
  ) { }

  public enableGraph: boolean = false;
  public conversionInProgress: boolean = false
  public convertedRate: number = 0;
  public selectedCurrency1: string = 'USD';
  public selectedCurrency2: string = 'INR';
  public sc1: string = 'USD';
  public sc2: string = 'INR';
  public amount: number = 0;
  public options1: any;
  public options2: any;
  public today = new Date();
  public isShow = false;

  ngOnInit(): void {
    this.getCurrencyList()
  }

  public getCurrencyList() {
    this.apiService.getCurrencyList().subscribe((data) => {
      const transformedArray = Object.entries(data.currencies).map(([code, name]) => ({ code, name }));
      this.options1 = transformedArray;
      this.options2 = transformedArray;
    });
  }

  public getHistoricalData(): void {
    this.enableGraph = true
  }

  public getConversionRate(currencyConvertFrom: string, currencyConvertTo: string, amount: number): void {
    this.apiService.getExchangeRates(currencyConvertFrom, currencyConvertTo, amount).subscribe((data) => {
      this.convertedRate = data.result
      this.isShow = true;
    });
  }

  public filterOptions1(): { code: string, name: string }[] {
    return this.options1 ? this.options1.filter((option: { code: string, name: string }) => option.code !== this.selectedCurrency2) : [];
  }

  public filterOptions2(): { code: string, name: string }[] {
    return this.options2 ? this.options2.filter((option: { code: string, name: string }) => option.code !== this.selectedCurrency1) : [];
  }

  campaignOne = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  get loaderEnabled() {
    return this.loaderService.loaderEnabled;
  }

  public dynamiConvert(): number {
    return this.amount * this.convertedRate;
  }
}
