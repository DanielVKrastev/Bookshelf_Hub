import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ProfileDetails } from '../../types/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BreadcrumbComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  isEditMode: boolean = false;

  profileDetails:ProfileDetails = {
    username: '',
    email: '',
    imageUrl: '',
    description: '',
    books: [],
    reviews: [],
  }

    form = new FormGroup({
      username: new FormControl(this.profileDetails.username, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(this.profileDetails.email, [Validators.required]),
      description: new FormControl(this.profileDetails.description),
      imageUrl: new FormControl(this.profileDetails.imageUrl),
      books: new FormControl(this.profileDetails.books),
      reviews: new FormControl(this.profileDetails.reviews),
  });

  constructor(private userService: UserService) {}

    ngOnInit(): void {
    const { username, email, description, imageUrl, books, reviews} = this.userService?.user!;
    
    this.profileDetails = { username, email, description: description!, imageUrl: imageUrl!, books, reviews };

    this.form.setValue({
      username, email, description: description!, imageUrl: imageUrl!, books, reviews
    });
  }

  getUser() {
    
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
  
  handleSaveProfile(){
    if(this.form.invalid){
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;

    const { username, email, imageUrl, description} = this.profileDetails;    

    this.userService.updateProfile(username, email, imageUrl, description).subscribe(() => {
      this.toggleEditMode();
    });
  }

    onCancel(event: Event) {
    event.preventDefault();

    //reset form after closing
    this.form.controls['username'].setValue(this.profileDetails.username);
    this.form.controls['email'].setValue(this.profileDetails.email);
    this.form.controls['imageUrl'].setValue(this.profileDetails.imageUrl);
    this.form.controls['description'].setValue(this.profileDetails.description);
    
    this.toggleEditMode();
  }

}
