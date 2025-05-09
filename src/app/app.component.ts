import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentTitle = 'Welcome Back! Here\'s Your Daily Overview';

  titleMap: { [key: string]: string } = {
    '/': 'Welcome Back! Here\'s Your Daily Overview',
    '/weather': '🌤️ Today\'s Weather',
    '/news': '🗞️ Top Headlines Just for You',
    '/notes': '📝 Not It Down — Your Daily Notes',
    '/saved': '📌 Your Bookmarked Insights',
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.currentTitle = this.titleMap[url] || 'Daily Dashboard';
      });
  }
}
