import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from "./core/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/footer/footer.component";
import { AuthenticateComponent } from './authenticate/authenticate';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, AuthenticateComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
