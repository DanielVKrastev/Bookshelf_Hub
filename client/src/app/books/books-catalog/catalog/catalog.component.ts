import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ApiService } from '../../../apiService';
import { Book } from '../../../types/book';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit{
  books: Book[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.getBooks().subscribe(books => {
      this.books = books;
      this.cd.detectChanges();
    })
  }
}
