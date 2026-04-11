import { Component } from '@angular/core';
import { FiltersBookComponent } from "./filters-book/filters-book.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { BreadcrumbComponent } from "../core/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-books-catalog',
  imports: [FiltersBookComponent, CatalogComponent, PaginationComponent, BreadcrumbComponent],
  templateUrl: './books-catalog.component.html',
  styleUrl: './books-catalog.component.css',
})
export class BooksCatalogComponent {}
