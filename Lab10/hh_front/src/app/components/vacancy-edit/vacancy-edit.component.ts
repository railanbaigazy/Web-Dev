import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Vacancy } from '../../interfaces/vacancy';
import { Company } from '../../interfaces/company';

@Component({
  selector: 'app-vacancy-edit',
  imports: [ReactiveFormsModule],
  template: `
    @if (vacancyForm) {
      <div class="vacancy-edit-container">
        <h2><i class="fa fa-edit"></i> Edit Vacancy Details</h2>
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
          <button type="submit" [disabled]="vacancyForm.invalid || isUnchanged()">
            Update
          </button>
        </form>
        <button class="delete-button" (click)="deleteVacancy()">
          <i class="fa fa-trash"></i> Delete Vacancy
        </button>
      </div>
    } @else {
      <div>
        <p>Loading vacancy details...</p>
      </div>
    }
 
  `,
  styleUrl: './vacancy-edit.component.css'
})
export class VacancyEditComponent implements OnInit {
  companies: Company[] = [];
  vacancy!: Vacancy;
  vacancyForm!: FormGroup;
  vacancyId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vacancyId = +this.route.snapshot.paramMap.get('id')!;

    this.apiService.getVacancy(this.vacancyId).subscribe({
      next: (vacancy: Vacancy) => {
        this.vacancy = {
          name: vacancy.name,
          description: vacancy.description,
          salary: vacancy.salary,
          company: vacancy.company
        };
        this.vacancyForm = this.fb.group({
          name: [vacancy.name, Validators.required],
          description: [vacancy.description, Validators.required],
          salary: [vacancy.salary, [Validators.required, Validators.min(0)]],
          company: [vacancy.company, Validators.required]
        });
      },
      error: (error) => console.error('Error loading vacancy details:', error)
    });

    this.apiService.getCompanies().subscribe({
      next: (companies) => this.companies = companies,
      error: (error) => console.error('Error fetching companies:', error)
    });
  }

  isUnchanged(): boolean {
    if (!this.vacancyForm || !this.vacancy) return true;
    console.log(this.vacancyForm.value);
    console.log(this.vacancy);

    return JSON.stringify(this.vacancyForm.value) === JSON.stringify(this.vacancy);
  }

  onSubmit(): void {
    if (this.vacancyForm.valid && !this.isUnchanged()) {
      this.apiService.updateVacancy(this.vacancyId, this.vacancyForm.value).subscribe({
        next: (response) => {
          console.log('Vacancy updated:', response);
          this.router.navigate(['/vacancy', this.vacancyId]);
        },
        error: (error) => console.error('Error updating vacancy:', error)
      });
    }
  }

  deleteVacancy(): void {
    if (confirm('Are you sure you want to delete this vacancy?')) {
      this.apiService.deleteVacancy(this.vacancyId).subscribe({
        next: () => {
          console.log('Vacancy deleted');
          this.router.navigate(['/vacancies']);
        },
        error: (error) => console.error('Error deleting vacancy:', error)
      });
    }
  }
}
