import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-weather',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  currentWeather: any;   
  forecast: any[] = []; 
  location: any;
  userLocation: string = '';
  loading:boolean = false;

  constructor(private weatherService: WeatherService){}
  getWeather() {
    this.loading = true;
    this.weatherService.getWeather(this.userLocation).subscribe({
      next: (data) => {
        this.loading = false;
        this.currentWeather = data.current;
        this.forecast = data.forecast?.forecastday || [];
        this.location = data.location;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }
}
