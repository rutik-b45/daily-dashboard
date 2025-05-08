import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '903ce5474e3d4a6f9c6103301250805';
  private baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
  constructor(private http: HttpClient) {}
  getWeather(location?:string): Observable<any> {
    const query = location?.trim() ? location : 'auto:ip';
    const url = `${this.baseUrl}?key=${this.apiKey}&q=${query}&days=5`;
    return this.http.get(url);
  }
}
