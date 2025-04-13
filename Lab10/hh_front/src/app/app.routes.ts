import { Routes } from '@angular/router';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyVacanciesListComponent } from './components/company-vacancies-list/company-vacancies-list.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { VacancyListComponent } from './components/vacancy-list/vacancy-list.component';
import { VacancyEditComponent } from './components/vacancy-edit/vacancy-edit.component';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { VacancyCreateComponent } from './components/vacancy-create/vacancy-create.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/companies',
        pathMatch: 'full',
    },
    {
        path: 'companies',
        title: 'Companies Page',
        component: CompanyListComponent
    },
    {
        path: 'company/:id/vacancies',
        title: 'Company Vacancies Page',
        component: CompanyVacanciesListComponent
    },
    {
        path: 'company/:id/edit',
        title: 'Edit Company Page',
        component: CompanyEditComponent
    },
    {
        path: 'company/new',
        title: 'Create Company Page',
        component: CompanyCreateComponent
    },
    {
        path: 'vacancies',
        title: 'Vacancies Page',
        component: VacancyListComponent
    },
    {
        path: 'vacancy/:id/edit',
        title: 'Vacancy Page',
        component: VacancyEditComponent
    },
    {
        path: 'vacancy/new',
        title: 'Create Vacancy Page',
        component: VacancyCreateComponent
    },
    {
        path: '**',
        redirectTo: '/companies'
    }
];
