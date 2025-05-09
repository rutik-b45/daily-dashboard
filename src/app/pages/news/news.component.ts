import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-news',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css' , '../dashboard/dashboard.component.css']
})
export class NewsComponent implements OnInit {
  newsLoading:boolean = false;
  newsArticles:any[] = [];
  category:string = '';
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
  getNews(){
    this.newsLoading = true;
     this.newsService.getNewsByKeyword(this.category).subscribe({
      next:(response)=>{
        this.newsLoading = false;
        this.newsLoading = false;
        this.newsArticles = response.articles || [];

        this.newsArticles = this.newsArticles
          .filter(article => article.urlToImage && article.description);
      },
      error:(err)=>{
        console.log("Error while getting an news");
        this.newsLoading = false;
      }
     },
  )
  }
  ngOnInit(): void {
    this.fetchNews();
  }
}
