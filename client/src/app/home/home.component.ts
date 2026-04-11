import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { MostHighReviewBooksComponent } from "./most-high-review-books/most-high-review-books.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, MostHighReviewBooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
