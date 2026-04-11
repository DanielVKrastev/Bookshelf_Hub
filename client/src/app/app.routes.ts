import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksCatalogComponent } from './books-catalog/books-catalog.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

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
];
