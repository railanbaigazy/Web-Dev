import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Company } from '../../interfaces/company';

@Component({
  selector: 'app-company-create',
  imports: [ReactiveFormsModule],
  template: `
    <div class="company-add-container">
      <h2><i class="fa fa-plus"></i> Add New Company</h2>
      <form [formGroup]="companyForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Company Name</label>
          <input id="name" type="text" formControlName="name" placeholder="Enter company name">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" placeholder="Enter company description"></textarea>
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <input id="city" type="text" formControlName="city" placeholder="Enter city">
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <textarea id="address" formControlName="address" placeholder="Enter address"></textarea>
        </div>
        <button type="submit" [disabled]="companyForm.invalid">
          Save Company
        </button>
      </form>
    </div>
  `,
  styleUrl: './company-create.component.css'
})
export class CompanyCreateComponent {
  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const companyData: Company = this.companyForm.value;
      this.apiService.createCompany(companyData).subscribe({
        next: (response) => {
          console.log('Company created:', response);
          this.router.navigate(['/company', response.id]);
        },
        error: (error) => console.error('Error creating company:', error)
      });
    }
  }
}
