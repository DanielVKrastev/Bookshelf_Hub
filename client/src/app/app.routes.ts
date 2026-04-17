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
import { CurrentBookComponent } from './books/current-book/current-book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthIsLoggedGuard } from './guards/authIsLogged.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // Book routing
    { path: 'books-catalog', children: [
        { path: '', component: BooksCatalogComponent },
        { path: ':bookId', component: CurrentBookComponent },
    ] },
     // User routing
    { path: 'login', canActivate: [AuthIsLoggedGuard], component: LoginComponent },
    { path: 'register', canActivate: [AuthIsLoggedGuard], component: RegisterComponent },
    { path: 'profile', canActivate: [AuthGuard], children: [
        { path: '', 
            loadComponent: () => import('./user/profile/profile.component').then((c) => c.ProfileComponent), //lazy loading
         },
        { path: 'my-books',  
            loadComponent: () => import('./user/my-books/my-books.component').then((c) => c.MyBooksComponent)
        },
        { path: 'my-favourite', component: MyFavouriteComponent },
        { path: 'my-reviews', 
            loadComponent: () => import('./user/my-reviews/my-reviews.component').then((c) => c.MyReviewsComponent),
        },
    ] },
    { path: 'add-book', 
        loadComponent: () => import('./books/add-book/add-book.component').then((c) => c.AddBookComponent),
        canActivate: [AuthGuard],
     },
    { path: '404', 
        loadComponent: () => import('./page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent),
    },
    { path: '**', redirectTo: '/404' },
];
