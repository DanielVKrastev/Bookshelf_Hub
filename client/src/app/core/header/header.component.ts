import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private router: Router, private cd: ChangeDetectorRef) { }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
