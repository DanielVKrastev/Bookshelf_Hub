import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {
    this.user = this.userService.user as UserForAuth;
  }

  ngOnInit(): void {
    this.userService.initUser().subscribe({
      next: (user) => {
        //this.user = user as UserForAuth;
        this.books = user?.books || [];
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}

