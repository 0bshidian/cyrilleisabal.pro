import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ArticleComponent } from "../article/article.component";
import { MarkdownComponent, MarkdownModule, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule, ArticleComponent, MarkdownComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {

	data: any = {};
	loading = true;
	errors: any;
	leftArticlesCount: any;
	leftArticles?: any[];
	rightArticles?: any[];

	constructor(private apollo: Apollo) { }

	ngOnInit(): void {
		this.apollo.watchQuery({
			query: gql`
				query Articles {
					articles(sort:"publishedAt:desc") {
						data {
							id, 
							attributes {
								title, 
								category {
									data {
										id, 
										attributes {
											name
										}
									}
								},
								content,
								tempsLecture,
								publishedAt, 	
								image {
									data {
										attributes {
											url
										}
									}
								}
							}
						}
					}
				}`
		})
		.valueChanges.subscribe((result: any) => {
			this.data = result?.data?.articles;
			this.leftArticlesCount = Math.ceil(this.data?.data.length / 5);
			this.leftArticles = this.data?.data.slice(0, this.leftArticlesCount);
			this.rightArticles = this.data?.data.slice(
				this.leftArticlesCount, 
				this.data?.data.length
			);
			this.loading = result.loading;
			this.errors = result.error;
		});
	}

}
