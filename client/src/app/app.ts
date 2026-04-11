import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./core/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
