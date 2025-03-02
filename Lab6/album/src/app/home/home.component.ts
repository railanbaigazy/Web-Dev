import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="home">
      <div class="container">
        <h1>Welcome to the Album App</h1>
        <p>Discover and manage your favorite albums with ease.</p>
        <a [routerLink]="['/albums']" class="cta-button">Browse Albums</a>
      </div>
    </section>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
