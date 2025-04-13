import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Company } from '../../interfaces/company';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h2>Companies list</h2>
      <ul>
        @for (company of companies; track company.id) {
          <li>
            <a [routerLink]="['/company', company.id, 'vacancies']" class="company">
              <i class="fa fa-industry"></i> {{ company.name }}
            </a>
            <a [routerLink]="['/company', company.id, 'edit']" class="edit">
              <i class="fa-solid fa-gear"></i>
            </a>
          </li>
        }
      </ul>
    </div>
  `,
  styleUrl: './company-list.component.css',
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCompanies().subscribe({
      next: data => {
          this.companies = data;
        },
      error: err => console.error('Error fetching companies:', err),
    });
  }
}

