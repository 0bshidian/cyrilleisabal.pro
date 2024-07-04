import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

	data: any = {};
	loading = true;
	errors: any;

	constructor(private apollo: Apollo) {}

	ngOnInit(): void {
		this.apollo.watchQuery({
			query: gql`
				query Categories {
					categories {
						data {
							id, 
							attributes {
								name
							}
						}
					}
				}
			`
		})
		.valueChanges.subscribe((result: any) => {
			this.data = result?.data?.categories;
			this.loading = result.loading;
			this.errors = result.error;
		});
	}
}
