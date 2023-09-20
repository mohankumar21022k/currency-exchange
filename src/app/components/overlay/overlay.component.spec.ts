import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoaderService, ApiService } from '../../services';
import { CurrencyConversionData } from '../../interfaces';
import { OverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;
  let apiService: ApiService;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [ApiService, LoaderService],
    });

    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch currency list on ngOnInit', () => {
    const currencyData = { success: true, currencies: { USD: 'US Dollar', EUR: 'Euro' } };
    spyOn(apiService, 'getCurrencyList').and.returnValue(of(currencyData));

    component.ngOnInit();

    expect(component.options1).toEqual([
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
    ]);
    expect(component.options2).toEqual([
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
    ]);
    expect(component.options3).toEqual([
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
    ]);
    expect(component.options4).toEqual([
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
    ]);
  });

  it('should set conversion rate and show overlay when getConversionRate is called', () => {
    const currencyConvertFrom = 'USD';
    const currencyConvertTo = 'EUR';
    const amount = 100;
    const conversionRate = 0.85;
    const data: CurrencyConversionData = {
      success: true,
      query: {
        from: "USD",
        to: "EUR",
        amount: 100,
      },
      info: {
        timestamp: 1695213843,
        quote: 0.85,
      },
      result:  0.85,
    };
    spyOn(apiService, 'getExchangeRates').and.returnValue(of(data));

    component.getConversionRate(currencyConvertFrom, currencyConvertTo, amount);

    expect(component.convertedRate).toEqual(conversionRate);
    expect(component.isShow).toBeTrue();
  });

  it('should filter options based on selected currency', () => {
    const options = [
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
      { code: 'GBP', name: 'British Pound' },
    ];
    const selectedCurrency = 'EUR';

    const filteredOptions = component.filterOptions(options, selectedCurrency);

    expect(filteredOptions).toEqual([
      { code: 'USD', name: 'US Dollar' },
      { code: 'GBP', name: 'British Pound' },
    ]);
  });

  it('should return loaderEnabled from LoaderService', () => {
    spyOnProperty(loaderService, 'loaderEnabled').and.returnValue(true);

    const loaderEnabled = component.loaderEnabled;

    expect(loaderEnabled).toBeTrue();
  });
});
