import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MarkdownComponent, MarkdownModule, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, MarkdownComponent, MarkdownModule],
  providers: [provideMarkdown()],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})

export class ArticleComponent implements OnInit {

	//@Input() articleId: number; 
	data: any = {};
	image: any;
	title: any;
	content: string | undefined; 
	tempsLecture : any;
	categories : string[] = [];
      	datePublication: any;	
	loading = true;
	errors: any;

	constructor(private apollo: Apollo, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.apollo.watchQuery({
			query: gql`
				query Articles($id: ID!) {
					article(id: $id) {
						data {
							id, 
							attributes {
								title, 
								content,
							       	tempsLecture,
								publishedAt,	
								categories {
									data {
										id, 
										attributes {
											name
										}
									}
								},
								image {
									data {
										attributes{
											url
										}
									}
								}
							}
						}
					}
				}`
				, 
				variables: {
					id: this.route.snapshot.paramMap.get("id")
					//id: this.articleId
				}
			})
			.valueChanges.subscribe(result => {
				this.data = result.data;
				this.image = this.data?.article.data.attributes.image?.data?.attributes?.url
				this.title = this.data?.article.data.attributes.title
				this.content = this.data?.article.data.attributes.content
				this.categories = this.data?.article.data.attributes.categories?.data.map(
					(category : any) => category.attributes.name
				) || []
				this.tempsLecture = this.data?.article.data.attributes.tempsLecture
				this.datePublication = this.data?.article.data.attributes.publishedAt
				this.loading = result.loading;
				this.errors = result.errors;
			});
	}
}
