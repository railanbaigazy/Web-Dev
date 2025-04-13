import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <ul class="nav-links">
          <li>
            <a routerLink="/companies" routerLinkActive="active">
              <i class="fa fa-building"></i> Companies
            </a>
          </li>
          <li>
            <a routerLink="/vacancies" routerLinkActive="active">
              <i class="fa fa-briefcase"></i> Vacancies
            </a>
          </li>
          <li>
            <a routerLink="/company/new" routerLinkActive="active">
              <i class="fa fa-plus"></i> New Company
            </a>
          </li>
          <li>
            <a routerLink="/vacancy/new" routerLinkActive="active">
              <i class="fa fa-plus"></i> New Vacancy
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
