import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbar } from './core/layout/main-navbar/main-navbar';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainNavbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'S7';

}
