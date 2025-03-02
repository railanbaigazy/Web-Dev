import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a [routerLink]="['/home']">Home</a>
          </li>
          <li>
            <a [routerLink]="['/albums']">Albums</a>
          </li>
          <li>
            <a [routerLink]="['/about']">About</a>
          </li>
        </ul>
      </nav>
    </header>
    <router-outlet />
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'album';
}
