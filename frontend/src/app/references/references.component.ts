import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from "apollo-angular";
import { MarkdownComponent, MarkdownModule, provideMarkdown } from 'ngx-markdown';
import gql from "graphql-tag";

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.css'
})

export class ReferencesComponent implements OnInit {

	data: any = [];
	loading = true; 
	errors: any;
	leftReferencesCount: any; 
	leftReferences?: any[];
	rightReferences?: any[];

	constructor(private apollo: Apollo) {}

	ngOnInit(): void {
		this.apollo.watchQuery({
			query: gql`
				query References {
					references {
						data {
							id, 
							attributes {
								title, 
								referent, 
								titreReferent, 
								referent2, 
								titreReferent2, 
								tasks, 
								missionDetails, 
						}
					}	
				}
			}`
		})
		.valueChanges.subscribe((result: any) => {
			this.data = result?.data?.references;
			this.leftReferencesCount = Math.ceil(this.data?.data.length);
			this.leftReferences = this.data?.data.slice(0, this.leftReferencesCount);
			this.rightReferences = this.data?.data.slice(
				this.leftReferencesCount, 
				this.data?.data.length
			);
			/*this.title = result?.data?.references.attributes.title;
			this.referent = result?.data?.references.attributes.referent; 
		       	this.titreReferent = result?.data?.references.attributes.titreReferent; 
			this.referent2 = result?.data?.references.attributes.referent2;
			this.titreReferent2 = result?.data?.references.attributes.titreReferent2;
			this.task = result?.data?.references.attributes.task;
			this.missionDetails = result?.data?.references.attributes.missionDetails;*/
		       
			this.loading = result.loading; 
			this.errors = result.error; 
		});
	}	
}
