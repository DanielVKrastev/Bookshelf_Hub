import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-my-books',
  imports: [BreadcrumbComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.css',
})
export class MyBooksComponent {}
