import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ApiService } from '../../../apiService';
import { Book } from '../../../types/book';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) { }

  isNewBook(createdAt: string): boolean {
    const created = new Date(createdAt);
    const now = new Date();

    const diffTime = now.getTime() - created.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 3;
  }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({
      next: (books) => {
      this.books = books;
      this.cd.detectChanges();
      },
      error: () => {
        this.books = [];
      }
    })
  }
}
