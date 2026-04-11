import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksCatalogComponent } from './books-catalog/books-catalog.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // Book routing
    { path: 'books-catalog', children: [
        { path: '', component: BooksCatalogComponent },
        //{ path: ':bookId', component: CurrentBook, canActivate: [AuthGuard] },
    ] },
];
