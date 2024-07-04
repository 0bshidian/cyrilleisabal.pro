import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { CommonModule } from "@angular/common";
import gql from "graphql-tag";

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competences.component.html',
  styleUrl: './competences.component.css'
})
export class CompetencesComponent implements OnInit {

	data: any = {};
	loading = true;
	errors: any;
	leftCompetencesCount: any;
	leftCompetences?: any[];
	rightCompetences?: any[];


	constructor(private apollo: Apollo) { }

	ngOnInit(): void {
		this.apollo.watchQuery({
			query: gql`
				query Competences {
					competences {
						data {
							id, 
							attributes {
								title, 
								content,
							}
						}
					}
				}
			`
		})
		.valueChanges.subscribe((result: any) => {
			this.data = result?.data?.competences;
			this.leftCompetencesCount = Math.ceil(this.data?.data.length);
			this.leftCompetences = this.data?.data.slice(0, this.leftCompetencesCount);
			this.rightCompetences = this.data?.data.slice(
				this.leftCompetencesCount, 
				this.data?.data.length
			);
			this.loading = result.loading;
			this.errors = result.error;
		});
	}
}
