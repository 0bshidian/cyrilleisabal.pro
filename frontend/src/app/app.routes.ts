import { Routes } from '@angular/router';
import { ArticlesComponent } from "./articles/articles/articles.component";
import { ArticleComponent } from "./articles/article/article.component";
import { PresentComponent } from "./articles/present/present.component";
import { CompetencesComponent } from "./articles/competences/competences.component";
import { ReferencesComponent } from "./references/references.component";
import { ContactComponent } from "./contact/contact.component";
import { ServicesComponent } from "./articles/services/services.component";


export const routes: Routes = [
	{ path: "", component: PresentComponent },
	{ path: "competences", component: CompetencesComponent },
	{ path: "references", component: ReferencesComponent },
	{ path: "articles", component: ArticlesComponent },
 	{ path: "articles/:id", component: ArticleComponent },
	{ path: "services", component: ServicesComponent },
	{ path: "contact", component: ContactComponent }
];
