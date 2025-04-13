import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Vacancy } from '../../interfaces/vacancy';
import { Company } from '../../interfaces/company';

@Component({
  selector: 'app-vacancy-create',
  imports: [ReactiveFormsModule],
  template: `
    <div class="vacancy-add-container">
      <h2><i class="fa fa-plus"></i> Add New Vacancy</h2>
      <form [formGroup]="vacancyForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Vacancy Name</label>
          <input id="name" type="text" formControlName="name" placeholder="Enter vacancy name">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" placeholder="Enter description"></textarea>
        </div>
        <div class="form-group">
          <label for="salary">Salary</label>
          <input id="salary" type="number" formControlName="salary" placeholder="Enter salary">
        </div>
        <div class="form-group">
          <label for="company">Company</label>
          <select id="company" formControlName="company">
            <option value="" disabled>Select a company</option>
            @for (company of companies; track company.id) {
              <option [value]="company.id">{{ company.name }}</option>
            }
          </select>
        </div>
        <button type="submit" [disabled]="vacancyForm.invalid">
          Save
        </button>
      </form>
    </div>
  `,
  styleUrl: './vacancy-create.component.css'
})
export class VacancyCreateComponent implements OnInit {
  companies: Company[] = [];
  vacancyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.vacancyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      company: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getCompanies().subscribe({
      next: (companies) => this.companies = companies,
      error: (error) => console.error('Error fetching companies:', error)
    });
  }

  onSubmit(): void {
    if (this.vacancyForm.valid) {
      const vacancyData: Vacancy = this.vacancyForm.value;
      this.apiService.createVacancy(vacancyData).subscribe({
        next: (response) => {
          console.log('Vacancy created:', response);
          this.router.navigate(['/vacancy', response.id]);
        },
        error: (error) => console.error('Error creating vacancy:', error)
      });
    }
  }
}
