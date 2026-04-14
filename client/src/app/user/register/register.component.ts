import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../user.service';
import { EMAIL_DOMAINS } from '../../../constants';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  domains = EMAIL_DOMAINS;

  constructor(private userService: UserService, private router: Router){}

  register(form: NgForm){
    if(form.invalid){
      console.error('Invalid Register Form!');
      return;
    }

    const { username, email, tel, password, rePassword } = form.value;
    
    this.userService.register(username, email, tel, password, rePassword).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
