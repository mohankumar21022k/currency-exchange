import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.apilayer.com/currency_data/';

  constructor(private http: HttpClient) { }

  getCurrencyList(): Observable<any> {
    const headers = new HttpHeaders().set('apikey', 'Q8NU9oVIVev011vOV5BEPxwBkZFxWNr1')
    return this.http.get<any>(this.apiUrl + `list`, { headers });
  }

  getExchangeRates(from: string, to: string, amount: string): Observable<any> {
    const headers = new HttpHeaders().set('apikey', 'Q8NU9oVIVev011vOV5BEPxwBkZFxWNr1')
    return this.http.get<any>(this.apiUrl + `convert?to=${to}&from=${from}&amount=${amount}`, { headers });
  }

  getHistoricalExchangeRates(from: string, to: string[], start_date: Date, end_date: Date): Observable<any> {
    return this.http.get<any>(this.apiUrl + `timeframe?start_date=${start_date}&end_date=${end_date}`);
  }
}
