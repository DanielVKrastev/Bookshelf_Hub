import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";
import { UserService } from '../user.service';
import { UserForAuth } from '../../types/user';
import { Book } from '../../types/book';
import { ApiService } from '../../apiService';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css',
})
export class MyBooksComponent implements OnInit {
  user: UserForAuth;
  books: Book[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private apiService: ApiService) {
    this.user = this.userService.user as UserForAuth;
  }

  ngOnInit(): void {
    console.log(this.user);
    this.books = this.userService.user?.books || [];
    this.isLoading = false;
  }

}
