import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { LoaderEnabled } from './loader.service';
import { environment } from '../../environments/environment';
import { CurrencyData, CurrencyConversionData } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.apilayer.com/currency_data/';

  constructor(private http: HttpClient) { }

  @LoaderEnabled()
  getCurrencyList(): Observable<CurrencyData | Error> {
    const headers = new HttpHeaders().set('apikey', environment.currencyApiKey);
    return this.http.get<CurrencyData>(this.apiUrl + `list`, { headers }).pipe(
      catchError(err => {
        console.error(err.message);
        const error = new Error(err.message);
        return of(error);
      })
    );
  }

  @LoaderEnabled()
  getExchangeRates(from: string, to: string, amount: number): Observable<CurrencyConversionData | Error> {
    const headers = new HttpHeaders().set('apikey', environment.currencyApiKey);
    return this.http.get<CurrencyConversionData>(this.apiUrl + `convert?to=${to}&from=${from}&amount=${amount}`, { headers })
    .pipe(
      catchError(err => {
        console.error(err.message);
        const error = new Error(err.message);
        return of(error);
      })
    );
  }

  // work in progress! but historical data for now currencies(example: USD/INR, EUR/USD, GBP/USD) have been added.
  getHistoricalExchangeRates(from: string, to: string[], start_date: Date, end_date: Date): Observable<any> {
    const headers = new HttpHeaders().set('apikey', environment.currencyApiKey);
    return this.http.get<any>(this.apiUrl + `timeframe?start_date=${start_date}&end_date=${end_date}`, { headers });
  }
}
