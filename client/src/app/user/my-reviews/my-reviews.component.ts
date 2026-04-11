import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-reviews',
  imports: [BreadcrumbComponent, RouterLink],
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.css',
})
export class MyReviewsComponent {}
