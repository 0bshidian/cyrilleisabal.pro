import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { ArticlesComponent } from "./articles/articles/articles.component";
import { ArticleComponent } from "./articles/article/article.component";
import { provideMarkdown } from "ngx-markdown";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, ArticlesComponent, ArticleComponent, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cyrille Isabal, Consultante en Finances Locales';
}
