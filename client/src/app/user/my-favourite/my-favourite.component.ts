import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-my-favourite',
  imports: [BreadcrumbComponent, RouterLink],
  templateUrl: './my-favourite.component.html',
  styleUrl: './my-favourite.component.css',
})
export class MyFavouriteComponent {}
