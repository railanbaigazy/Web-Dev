import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <section class="about">
      <div class="container">
        <h1>About This Project</h1>
        <p>This application is designed to help users explore and manage albums effortlessly.</p>
        <p>Built with Angular and modern web technologies, it provides a seamless experience.</p>
        <a [routerLink]="['/home']" class="back-button"><i class="fa-solid fa-arrow-left"></i> Back to Home</a>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
