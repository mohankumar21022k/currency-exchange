import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { CurrencyConversionData } from '../interfaces';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get currency list', () => {
    const mockCurrencyList = { success: true, currencies: { USD: 'United States Dollar' } };

    service.getCurrencyList().subscribe((response) => {
      expect(response).toEqual(mockCurrencyList);
    });

    const request = httpMock.expectOne(service['apiUrl'] + 'list');
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('apikey')).toBe(environment.currencyApiKey);

    request.flush(mockCurrencyList);
  });

  it('should get exchange rates', () => {
    const from = 'USD';
    const to = 'EUR';
    const amount = 100;
    const mockExchangeRates: CurrencyConversionData = {
      success: true,
      query: {
        from: "UGX",
        to: "IMP",
        amount: 44,
      },
      info: {
        timestamp: 1695213843,
        quote: 0.000215,
      },
      result: 0.00946,
    };

    service.getExchangeRates(from, to, amount).subscribe((response) => {
      expect(response).toEqual(mockExchangeRates);
    });

    const request = httpMock.expectOne(
      `${service['apiUrl']}convert?to=${to}&from=${from}&amount=${amount}`
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('apikey')).toBe(environment.currencyApiKey);

    request.flush(mockExchangeRates);
  });

  it('should get historical exchange rates', () => {
    const from = 'USD';
    const to = ['EUR', 'GBP'];
    const start_date = new Date();
    const end_date = new Date();
    const mockHistoricalRates = [{ date: start_date, rates: { EUR: 0.85, GBP: 0.75 } }];

    service.getHistoricalExchangeRates(from, to, start_date, end_date).subscribe((response) => {
      expect(response).toEqual(mockHistoricalRates);
    });

    const request = httpMock.expectOne(
      `${service['apiUrl']}timeframe?start_date=${start_date}&end_date=${end_date}`
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('apikey')).toBe(environment.currencyApiKey);

    request.flush(mockHistoricalRates);
  });
});
