import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TopRatingBooksComponent } from "../../home/top-rating-books/top-rating-books.component";
import { ApiService } from '../../apiService';
import { Book } from '../../types/book';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-book',
  standalone: true,
  imports: [BreadcrumbComponent, TopRatingBooksComponent, DatePipe, RouterLink],
  templateUrl: './current-book.component.html',
  styleUrl: './current-book.component.css',
})
export class CurrentBookComponent implements OnInit{
  book: Book = <Book>{};
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    const bookId = (this.route.snapshot.params['bookId']);
    console.log(bookId);
    
    this.apiService.getSingleBook(bookId).subscribe(book => {
      console.log(bookId);
      console.log(book);
      
      
      this.book = book;
      this.isLoading = false;
      this.cd.detectChanges();
    });
  }

  getStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
}

}
