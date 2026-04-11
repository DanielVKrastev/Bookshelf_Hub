import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BooksCatalogComponent } from './books/books-catalog/books-catalog.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MyBooksComponent } from './user/my-books/my-books.component';
import { MyFavouriteComponent } from './user/my-favourite/my-favourite.component';
import { MyReviewsComponent } from './user/my-reviews/my-reviews.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // Book routing
    { path: 'books-catalog', children: [
        { path: '', component: BooksCatalogComponent },
        //{ path: ':bookId', component: CurrentBook, canActivate: [AuthGuard] },
    ] },
     // User routing
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'my-books', component: MyBooksComponent },
    { path: 'my-favourite', component: MyFavouriteComponent },
    { path: 'my-reviews', component: MyReviewsComponent },
    { path: 'add-book', 
        component: AddBookComponent
        //loadComponent: () => import('./theme/add-theme/add-theme').then((c) => c.AddTheme), //lazy loading
        //canActivate: [AuthGuard],
     },
];
