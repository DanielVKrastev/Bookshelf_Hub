import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";
import { UserService } from '../user.service';
import { UserForAuth } from '../../types/user';
import { Book } from '../../types/book';
import { ApiService } from '../../apiService';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [BreadcrumbComponent, RouterLink, FormsModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css',
})
export class MyBooksComponent implements OnInit {
  user: UserForAuth;
  books: Book[] = [];
  isLoading: boolean = true;

  editingBookId: string | null = null;
  editForm: any = {};

  constructor(private userService: UserService, private apiService: ApiService, private cd: ChangeDetectorRef) {
    this.user = this.userService.user as UserForAuth;
  }

  startEdit(book: Book) {
    this.editingBookId = book._id;

    this.editForm = {
      bookId: book._id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      publishYear: book.publishYear,
      language: book.language,
      totalPage: book.totalPage,
      country: book.country,
      imageUrl: book.imageUrl,
      description: book.description,
      category: book.category
    };
  }

  saveEdit(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid Login Form!');
      return;
    }

    const {
      bookId,
      author,
      category,
      country,
      description,
      imageUrl,
      language,
      publishYear,
      publisher,
      title,
      totalPage,
    } = this.editForm;

    this.apiService.editBook(
      bookId,
      author,
      category,
      country,
      description,
      imageUrl,
      language,
      publishYear,
      publisher,
      title,
      totalPage
    ).subscribe({
      // update UI without reload
      next: (updated) => {

        const index = this.books.findIndex(b => b._id === bookId);
        if (index !== -1) {
          this.books[index] = { ...this.books[index], ...updated };
        }

        this.cancelEdit();
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteBook(bookId: string) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.apiService.deleteBook(bookId).subscribe({
      next: () => {
        this.books = this.books.filter(b => b._id !== bookId); //delete book form table
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  cancelEdit() {
    this.editingBookId = null;
    this.editForm = {};
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

