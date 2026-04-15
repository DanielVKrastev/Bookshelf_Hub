import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TopRatingBooksComponent } from "../../home/top-rating-books/top-rating-books.component";
import { ApiService } from '../../apiService';
import { Book } from '../../types/book';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-current-book',
  standalone: true,
  imports: [BreadcrumbComponent, TopRatingBooksComponent, DatePipe, RouterLink, FormsModule],
  templateUrl: './current-book.component.html',
  styleUrl: './current-book.component.css',
})
export class CurrentBookComponent implements OnInit {
  book: Book = <Book>{};
  isLoading: boolean = true;
  userId: string | undefined = undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router, private cd: ChangeDetectorRef) {
    this.userId = userService.user?.id;
  }

  ngOnInit(): void {
   this.loadBook();
  }

  loadBook() {
    const bookId = this.route.snapshot.params['bookId'];

    this.apiService.getSingleBook(bookId).subscribe(book => {
      this.book = book;
      this.isLoading = false;
      this.cd.detectChanges();
    });
  }

  getStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }

  rating = 0;
  hoveredRating = 0;

  setRating(value: number) {
    this.rating = value;
  }

  setHover(value: number) {
    this.hoveredRating = value;
  }

  resetHover() {
    this.hoveredRating = 0;
  }

  addReview(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { text } = (form.value);

    this.apiService.createReviewForBook(this.book._id, this.rating, text, this.userId as string).subscribe(data => {
      this.loadBook();
    })
  }

}
