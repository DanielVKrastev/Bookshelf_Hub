import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { TopRatingBooksComponent } from "./top-rating-books/top-rating-books.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, TopRatingBooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
