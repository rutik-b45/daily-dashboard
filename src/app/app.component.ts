import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentTitle = 'Dashboard';

  titleMap: { [key: string]: string } = {
    '/': 'Dashboard',
    '/weather': 'Weather',
    '/news': 'News',
    '/notes': 'Notes',
    '/saved': 'Saved',
  };

  constructor(private router: Router) {
    
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.currentTitle = this.titleMap[url] || 'Dashboard';
      });
  }

}