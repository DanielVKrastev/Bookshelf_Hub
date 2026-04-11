import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-add-book',
  imports: [BreadcrumbComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {}
