import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'd37ecdc4e1c342259e6161a4688ed007';
  private baseUrl = 'newsapi.org/v2/top-headlines';
  constructor(private http: HttpClient) {}
  getNews():Observable<any>{
    const url = `${this.baseUrl}?sources=techcrunch&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
