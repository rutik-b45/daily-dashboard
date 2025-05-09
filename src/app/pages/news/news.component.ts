import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css' , '../dashboard/dashboard.component.css']
})
export class NewsComponent implements OnInit {
  newsLoading:boolean = false;
  newsArticles:any[] = [];
  constructor(private newsService: NewsService){}

  fetchNews() {
    this.newsLoading = true;
    this.newsService.getNews().subscribe({
      next: (response) => {
        this.newsLoading = false;
        this.newsArticles = response.articles || [];

        this.newsArticles = this.newsArticles
          .filter(article => article.urlToImage && article.description)
      },
      error: (err) => {
        this.newsLoading = false;
        console.error('Error fetching news:', err);
      }
    });
  }
  ngOnInit(): void {
    this.fetchNews();
  }
}
