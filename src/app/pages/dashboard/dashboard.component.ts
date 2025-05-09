import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentWeather: any;   
  forecast: any[] = []; 
  location: any;
  newsArticles: any[] = [];
  loadingWeather: boolean = false;
  loadingNews: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.fetchWeather();
    this.fetchNews();
  }

  fetchWeather() {
    this.loadingWeather = true;
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        this.loadingWeather = false;
        this.currentWeather = data.current;
        this.forecast = data.forecast.forecastday;
        this.location = data.location;
      },
      error: (err) => {
        this.loadingWeather = false;
        console.error('Error fetching weather:', err);
        alert('Failed to load weather data. Please try again later.');
      }
    });
  }

  fetchNews() {
    this.loadingNews = true;
    this.newsService.getNews().subscribe({
      next: (response) => {
        this.loadingNews = false;
        this.newsArticles = response.articles || [];

        this.newsArticles = this.newsArticles
          .filter(article => article.urlToImage && article.description)
          .slice(0, 3);
      },
      error: (err) => {
        this.loadingNews = false;
        console.error('Error fetching news:', err);
      }
    });
  }
}
