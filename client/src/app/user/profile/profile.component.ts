import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  get user() {
    return this.userService.user;
  }

  constructor(private userService: UserService) {
    console.log(this.user);
    
  }

}
