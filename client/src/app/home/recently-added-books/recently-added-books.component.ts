import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-recently-added-books',
  imports: [RouterLink],
  templateUrl: './recently-added-books.component.html',
  styleUrl: './recently-added-books.component.css',
})
export class RecentlyAddedBooksComponent {}
