import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly apiKey = 'd37ecdc4e1c342259e6161a4688ed007';
  private readonly baseUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getNews(country: string = 'us', category: string = 'business'): Observable<any> {
    const params = new HttpParams()
      .set('country', country)
      .set('category', category)
      .set('apiKey', this.apiKey);

    return this.http.get(this.baseUrl, { params });
  }
}
