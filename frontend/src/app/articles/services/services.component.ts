import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { CommonModule } from "@angular/common";
import gql from "graphql-tag";
import { MarkdownComponent, MarkdownModule, provideMarkdown } from 'ngx-markdown';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {

        data: any = {};
        loading = true;
        errors: any;
        leftServicesCount: any;
        leftServices?: any[];
        rightServices?: any[];


        constructor(private apollo: Apollo) { }

        ngOnInit(): void {
                this.apollo.watchQuery({
                        query: gql`
                                query Service {
                                        services {
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
                        this.data = result?.data?.services;
                        this.leftServicesCount = Math.ceil(this.data?.data.length);
                        this.leftServices = this.data?.data.slice(0, this.leftServicesCount);
                        this.rightServices = this.data?.data.slice(
                                this.leftServicesCount,
                                this.data?.data.length
                        );
                        this.loading = result.loading;
                        this.errors = result.error;
                });
        }
}

