import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { NewsService } from '../../news.service';
import { Note, NotesService } from '../../notes.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
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
  Notes: Note[] = [];

  constructor(
    private weatherService: WeatherService,
    private newsService: NewsService,
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.fetchWeather();
    this.fetchNews();
    this.getNotes();
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
  getNotes() {
    this.notesService.getNotes().subscribe({
      next: (notes)=>{
        this.Notes = notes.slice(0,2);
      },
      error:(err) =>{
        console.log(err)
      }
    })
  }
}
