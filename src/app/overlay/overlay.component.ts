import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  public conversionInProgress: boolean = false;
  public convertedRate: number = 0;
  public requestedConvertionAmount: number;
  public selectedCurrency1: string = 'USD';
  public selectedCurrency2: string = 'INR';
  public selectedCurrency3: string = 'USD';
  public selectedCurrency4: string = 'INR';
  public amount: number = 0;
  public options1: any;
  public options2: any;
  public options3: any;
  public options4: any;
  public isShow = false;

  ngOnInit(): void {
    this.getCurrencyList()
  }

  public getCurrencyList() {
    this.apiService.getCurrencyList().subscribe((data) => {
      const transformedArray = Object.entries(data.currencies).map(([code, name]) => ({ code, name }));
      this.options1 = transformedArray;
      this.options2 = transformedArray;
      this.options3 = transformedArray;
      this.options4 = transformedArray;
    });
  }

  public getConversionRate(currencyConvertFrom: string, currencyConvertTo: string, amount: number): void {
    this.requestedConvertionAmount = amount;
    this.apiService.getExchangeRates(currencyConvertFrom, currencyConvertTo, amount).subscribe((data) => {
      this.convertedRate = data.result
      this.isShow = true;
    });
  }

  public filterOptions(options: any, selectedCurrency: string): { code: string, name: string }[] {
    return options ? options.filter((option: { code: string, name: string }) => option.code !== selectedCurrency) : [];
  }

  historicalDataForm = new FormGroup({
    start: new FormControl(new Date(2023, 7, 21)),
    end: new FormControl(new Date(2023, 8, 18)),
  });

  get loaderEnabled() {
    return this.loaderService.loaderEnabled;
  }
}
