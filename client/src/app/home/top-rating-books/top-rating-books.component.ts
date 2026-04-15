import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Book } from '../../types/book';
import { ApiService } from '../../apiService';

@Component({
  selector: 'app-top-rating-books',
  imports: [RouterLink],
  templateUrl: './top-rating-books.component.html',
  styleUrl: './top-rating-books.component.css',
})
export class TopRatingBooksComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe(books => {
      const sortedBooksRating = books.sort((a: Book, b: Book) => {
        return b.averageRating - a.averageRating;
      });
      
      this.books = sortedBooksRating.slice(0, 6);
      this.cd.detectChanges();
    })
  }

  getStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}
