import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { NewsComponent } from './pages/news/news.component';
import { NotesComponent } from './pages/notes/notes.component';
import { SavedComponent } from './pages/saved/saved.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },             
    { path: 'weather', component: WeatherComponent },
    { path: 'news', component: NewsComponent },
    { path: 'notes', component: NotesComponent },
    { path: 'saved', component: SavedComponent },
    { path: '**', redirectTo: '' }                          
  ];
