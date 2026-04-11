import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { TopRatingBooksComponent } from "./top-rating-books/top-rating-books.component";
import { RecentlyAddedBooksComponent } from "./recently-added-books/recently-added-books.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, TopRatingBooksComponent, RecentlyAddedBooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
