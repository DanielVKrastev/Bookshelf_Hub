import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";
import { UserForAuth } from '../../types/user';
import { Review } from '../../types/review';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../apiService';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-my-reviews',
  imports: [BreadcrumbComponent, RouterLink, FormsModule, DatePipe],
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.css',
})
export class MyReviewsComponent implements OnInit {
  user: UserForAuth;
  reviews: Review[] = [];
  isLoading: boolean = true;

  editingReviewId: string | null = null;
  editForm: any = {};

  constructor(private userService: UserService, private apiService: ApiService, private cd: ChangeDetectorRef) {
    this.user = this.userService.user as UserForAuth;
  }

  startEdit(review: Review) {
    this.editingReviewId = review._id;

    this.editForm = {
      bookId: review.bookId._id,
      reviewId: review._id,
      text: review.text,
      rating: review.rating,
    };
  }

  saveEdit(form: NgForm) {        
    if (form.invalid) {
      console.error('Invalid Login Form!');
      return;
    }

    const {
      bookId,
      reviewId,
      text,
      rating,
    } = this.editForm;

    this.apiService.updateReview(
      bookId,
      reviewId,
      text,
      rating,
    ).subscribe({
      // update UI without reload
      next: (updated) => {

        this.reviews = this.reviews.map(r =>
          r._id === reviewId
            ? {
              ...r,
              text: updated.text,
              rating: updated.rating
            }
            : r
        );
        this.cancelEdit();
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteReview(bookId: string, reviewId: string) {
    if (!confirm('Are you sure you want to delete this review?')) return;

    this.apiService.deleteReview(bookId, reviewId).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r._id !== reviewId); //delete book form table
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  cancelEdit() {
    this.editingReviewId = null;
    this.editForm = {};
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
