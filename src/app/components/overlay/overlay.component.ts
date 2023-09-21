import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoaderService, ApiService } from '../../services';
import { Currencies, CurrencyConversionData, CurrencyData } from '../../interfaces';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent implements OnInit {
  public requestedConvertionAmount: number = 0;
  public convertedRate: number = 0;
  public amount: number = 0;
  public selectedCurrency1: string = 'USD';
  public selectedCurrency2: string = 'INR';
  public selectedCurrency3: string = 'USD';
  public selectedCurrency4: string = 'INR';
  public options1: Currencies[] = [];
  public options2: Currencies[] = [];
  public options3: Currencies[] = [];
  public options4: Currencies[] = [];
  public conversionInProgress: boolean = false;
  public isShow = false;
  public errorMessage = ''

  constructor(
    private apiService: ApiService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  public getCurrencyList(): void {
    this.apiService.getCurrencyList().subscribe((data: CurrencyData | Error) => {
      if (data instanceof Error) {
        this.errorMessage = data.message;
        this.isShow = false;
      } else {
        const transformedArray = Object.entries(data.currencies).map(([code, name]) => ({ code, name }));
        this.options1 = transformedArray;
        this.options2 = transformedArray;
        this.options3 = transformedArray;
        this.options4 = transformedArray;
      }
    });
  }

  public getConversionRate(currencyConvertFrom: string, currencyConvertTo: string, amount: number): void {
    this.requestedConvertionAmount = amount;
    this.apiService.getExchangeRates(currencyConvertFrom, currencyConvertTo, amount).subscribe((data: CurrencyConversionData | Error) => {
      if (data instanceof Error) {
        this.errorMessage = data.message;
        this.isShow = false;
      } else {
        this.convertedRate = data.result;
        this.isShow = true;
      }
    });
  }

  public filterOptions(options: any, selectedCurrency: string): Currencies[] {
    return options ? options.filter((option: { code: string, name: string }) => option.code !== selectedCurrency) : [];
  }

  historicalDataForm = new FormGroup({
    start: new FormControl(new Date(2023, 7, 21)),
    end: new FormControl(new Date(2023, 8, 20)),
  });

  get loaderEnabled(): boolean {
    return this.loaderService.loaderEnabled;
  }
}
