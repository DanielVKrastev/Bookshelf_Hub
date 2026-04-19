import { ChangeDetectorRef, Component } from '@angular/core';
import { BreadcrumbComponent } from "../../core/breadcrumb/breadcrumb.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../apiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [BreadcrumbComponent, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  isSubmitClick: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private cd: ChangeDetectorRef){}

  addBook(form: NgForm) {
    if(form.invalid){
      console.log(form.value);
      this.isSubmitClick = true;
      console.log(this.isSubmitClick);
      
      this.cd.detectChanges();
      //console.error('Invalid Login Form!');
      return;
    }
    
    const {author, category, country, description, imageUrl, language, publishYear, publisher, title, totalPage } = (form.value);

    this.apiService.createBook(author, category, country, description, imageUrl, language, publishYear, publisher, title, totalPage).subscribe(data => {
      this.router.navigate(['/books-catalog']);
    })

  }
}
