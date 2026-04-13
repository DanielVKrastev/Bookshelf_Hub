import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../core/breadcrumb/breadcrumb.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  imports: [BreadcrumbComponent, RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {}
