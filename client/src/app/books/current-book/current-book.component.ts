import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";
import { TopRatingBooksComponent } from "../../home/top-rating-books/top-rating-books.component";

@Component({
  selector: 'app-current-book',
  imports: [BreadcrumbComponent, RouterLink, TopRatingBooksComponent],
  templateUrl: './current-book.component.html',
  styleUrl: './current-book.component.css',
})
export class CurrentBookComponent {}
