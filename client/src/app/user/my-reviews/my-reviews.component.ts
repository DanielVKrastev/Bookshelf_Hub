import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";
import { UserForAuth } from '../../types/user';
import { Review } from '../../types/review';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-reviews',
  imports: [BreadcrumbComponent, RouterLink, DatePipe],
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.css',
})
export class MyReviewsComponent implements OnInit {
  user: UserForAuth;
  reviews: Review[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {
    this.user = this.userService.user as UserForAuth;
  }

  ngOnInit(): void {
    this.userService.initUser().subscribe({
      next: (user) => {
        //this.user = user as UserForAuth;
        this.reviews = user?.reviews || [];
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
