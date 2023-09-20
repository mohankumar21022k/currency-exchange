import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderEnabled } from './loader.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.apilayer.com/currency_data/';

  constructor(private http: HttpClient) { }
 
  @LoaderEnabled()
   getCurrencyList(): Observable<any> {
    const headers = new HttpHeaders().set('apikey',  environment.currencyApiKey);
    return this.http.get<any>(this.apiUrl + `list`, { headers });
  }

  @LoaderEnabled()
   getExchangeRates(from: string, to: string, amount: number): Observable<any> {
    const headers = new HttpHeaders().set('apikey', environment.currencyApiKey);
    return this.http.get<any>(this.apiUrl + `convert?to=${to}&from=${from}&amount=${amount}`, { headers });
  }

  getHistoricalExchangeRates(from: string, to: string[], start_date: Date, end_date: Date): Observable<any> {
    const headers = new HttpHeaders().set('apikey', environment.currencyApiKey);
    return this.http.get<any>(this.apiUrl + `timeframe?start_date=${start_date}&end_date=${end_date}`, { headers });
  }
}
