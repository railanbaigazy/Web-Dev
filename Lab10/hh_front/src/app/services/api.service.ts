import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Company } from '../interfaces/company';
import { Vacancy } from '../interfaces/vacancy';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}/companies/`)
      .pipe(catchError(this.handleError));
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/companies/${id}/`)
      .pipe(catchError(this.handleError));
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/companies/`, company)
      .pipe(catchError(this.handleError));
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/companies/${id}/`, company)
      .pipe(catchError(this.handleError));
  }

  deleteCompany(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/companies/${id}/`)
      .pipe(catchError(this.handleError));
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.baseUrl}/vacancies/`)
      .pipe(catchError(this.handleError));
  }

  getVacancy(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.baseUrl}/vacancies/${id}/`)
      .pipe(catchError(this.handleError))
  }

  createVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.baseUrl}/vacancies/`, vacancy)
      .pipe(catchError(this.handleError));
  }

  updateVacancy(id: number, vacancy: Vacancy): Observable<Vacancy> {
    return this.http.put<Vacancy>(`${this.baseUrl}/vacancies/${id}/`, vacancy)
      .pipe(catchError(this.handleError));
  }

  deleteVacancy(id: number): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/vacancies/${id}/`)
      .pipe(catchError(this.handleError));
  }

  getCompanyVacancies(companyId: number): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.baseUrl}/companies/${companyId}/vacancies/`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      console.error(`Server-side error (${error.status}):`, error.message);
      switch (error.status) {
        case 404:
          errorMessage = 'Error: Requested resource not found (404).';
          break;
        case 500:
          errorMessage = 'Error: Internal Server Error (500).';
          break;
        case 403:
          errorMessage = 'Error: Access Denied (403).';
          break;
        default:
          errorMessage = `Unexpected Error: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
