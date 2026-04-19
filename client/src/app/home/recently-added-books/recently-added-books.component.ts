import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Book } from '../../types/book';
import { ApiService } from '../../apiService';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time-pipe';

@Component({
  selector: 'app-recently-added-books',
  imports: [RouterLink, ElapsedTimePipe],
  templateUrl: './recently-added-books.component.html',
  styleUrl: './recently-added-books.component.css',
})
export class RecentlyAddedBooksComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.apiService.getBooks(4).subscribe(books => {
      this.books = books;
      this.cd.detectChanges();
    })
  }

  getStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}

