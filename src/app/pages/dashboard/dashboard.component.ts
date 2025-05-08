import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentWeather: any;   
  forecast: any[] = []; 
  location: any;
  loading: boolean = false;
  constructor(private weatherService: WeatherService) {}
  ngOnInit() {
    this.loading = true;
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        this.loading = false;
        this.currentWeather = data.current;
        this.forecast = data.forecast.forecastday;
        this.location = data.location;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching weather:', err);
        alert('Failed to load weather data. Please try again later.');
      }
    });
  }
}
