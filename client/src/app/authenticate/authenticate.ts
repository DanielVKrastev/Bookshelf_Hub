import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Loader } from '../shared/loader/loader';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [Loader],
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class AuthenticateComponent implements OnInit{
  isAuthenticating = true;

  constructor(private userService: UserService, private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.isAuthenticating = false;
        this.cd.detectChanges();
      },
      complete: () => {
        this.isAuthenticating = false;
        this.cd.detectChanges();
      },
    });

  } 

}
