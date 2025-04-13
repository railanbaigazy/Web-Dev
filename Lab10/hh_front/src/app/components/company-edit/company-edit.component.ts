import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Company } from '../../interfaces/company';

@Component({
  selector: 'app-company-edit',
  imports: [ReactiveFormsModule],
  template: `
    @if (companyForm) {
      <div class="form-container">
        <h2><i class="fa fa-edit"></i> Edit Company Details</h2>
        <form [formGroup]="companyForm" (ngSubmit)="onSubmit()">
          <label>Name</label>
          <input formControlName="name" placeholder="Company name" />

          <label>Description</label>
          <textarea formControlName="description" placeholder="Enter description"></textarea>

          <label>City</label>
          <input formControlName="city" placeholder="City" />

          <label>Address</label>
          <textarea formControlName="address" placeholder="Address"></textarea>

          <button type="submit" [disabled]="companyForm.invalid || isUnchanged()">
            Save
          </button>
        </form>
        <button class="delete-button" (click)="deleteCompany()">
          <i class="fa fa-trash"></i> Delete company
        </button>
      </div>
    }
    
  `,
  styleUrl: './company-edit.component.css'
})
export class CompanyEditComponent {
  companyForm!: FormGroup;
  company!: Company;
  companyId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyId = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getCompany(this.companyId).subscribe(company => {
      this.company = {
        name: company.name,
        description: company.description,
        city: company.city,
        address: company.address
      };
      this.companyForm = this.fb.group({
        name: [company.name, Validators.required],
        description: [company.description, Validators.required],
        city: [company.city, Validators.required],
        address: [company.address, Validators.required]
      });
    });
  }

  isUnchanged(): boolean {
    if (!this.companyForm || !this.company) return true;

    return JSON.stringify(this.companyForm.value) === JSON.stringify(this.company);
  }

  onSubmit() {
    if (this.companyForm.valid && this.isUnchanged()) {
      this.apiService.updateCompany(this.companyId, this.companyForm.value)
        .subscribe(response => {
          console.log('Company updated:', response);
          this.router.navigate(['/company', this.companyId]);
        });
    }
  }

  deleteCompany() {
    this.apiService.deleteCompany(this.companyId).subscribe(response => {
      console.log('Company deleted:', response);
      this.router.navigate(['/']);
    });
  }
}
