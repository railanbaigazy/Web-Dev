import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from './album';
import { catchError, Observable, throwError } from 'rxjs';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private albumsUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAlbumById(albumId: number): Observable<Album> {
    const url = `${this.albumsUrl}/${albumId}`;
    return this.http.get<Album>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateAlbum(albumId: number, updatedAlbum: Album): Observable<Album> {
    const url = `${this.albumsUrl}/${albumId}`;
    return this.http.put<Album>(url, updatedAlbum, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getAlbumPhotos(albumId: number): Observable<Photo[]> {
    const url = `${this.albumsUrl}/${albumId}/photos`;
    return this.http.get<Photo[]>(url).pipe(
      catchError(this.handleError)
    )
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
