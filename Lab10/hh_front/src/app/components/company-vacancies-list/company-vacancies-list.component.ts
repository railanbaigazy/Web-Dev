import { Component } from '@angular/core';
import { Company } from '../../interfaces/company';
import { Vacancy } from '../../interfaces/vacancy';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-vacancies-list',
  imports: [RouterLink],
  template: `
    @if (company) {
      <div class="vacancies-container">
        <h2>
          <i class="fa fa-building"></i>
          "{{ company.name }}" vacancies
          <a [routerLink]="['/company', company.id, 'edit']" class="edit">
            <i class="fa-solid fa-gear"></i>
          </a>
        </h2>
        <ul>
          @if (vacancies.length > 0) {
            @for (vacancy of vacancies; track vacancy.id) {
              <li>
                <a [routerLink]="['/vacancy', vacancy.id, 'edit']">
                  {{ vacancy.name }}
                  <span>Salary: {{ vacancy.salary }}$</span>
                </a>
              </li>
            }
          } @else {
            <li>
              <p>No vacancies available for this company.</p>
            </li>
          }
        </ul>
      </div>
    } @else {
      <div class="loading">
        <p>Loading company data...</p>
      </div>
    }
  `,
  styleUrl: './company-vacancies-list.component.css'
})
export class CompanyVacanciesListComponent {
  companyID!: number;
  company: Company | null = null;
  vacancies: Vacancy[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.companyID = +this.route.snapshot.paramMap.get('id')!;

    this.apiService.getCompany(this.companyID).subscribe({
      next: data => this.company = data,
      error: err => console.error('Error fetching company:', err),
    });

    this.apiService.getCompanyVacancies(this.companyID).subscribe({
      next: data => this.vacancies = data,
      error: err => console.error('Error fetching vacancies:', err),
    });
  }
}
