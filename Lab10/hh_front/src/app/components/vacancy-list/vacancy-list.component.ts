import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-vacancy-list',
  imports: [RouterLink],
  template: `
    <div class="container">
      <h2><i class="fa fa-briefcase"></i> Vacancies List</h2>
      <ul>
        @for (vacancy of vacancies; track vacancy.id) {
          <li>
            <a [routerLink]="['/vacancy', vacancy.id, 'edit']">
              <i class="fa fa-file-alt"></i> {{ vacancy.name }} - <span>Salary: {{ vacancy.salary }}</span>
            </a>
          </li>
        }
      </ul>
    </div>
  `,
  styleUrl: './vacancy-list.component.css'
})
export class VacancyListComponent implements OnInit {
  vacancies: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getVacancies().subscribe({
      next: (data) => {
        this.vacancies = data;
      },
      error: (error) => {
        console.error('Error fetching vacancies:', error);
      }
    });
  }
}
