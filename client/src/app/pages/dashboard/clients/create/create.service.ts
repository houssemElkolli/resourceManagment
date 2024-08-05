import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreateService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:3001/clients', data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // Handle not found error
      console.error('Item not found');
    } else if (error.status === 400) {
      // Handle server error
      console.error('Server error');
    } else if (error.status === 500) {
      // Handle server error
      console.error('Server error');
    } else {
      // Handle other errors
      console.error('An error occurred:', error);
    }
    // Return an observable with a user-facing error message or null
    return throwError(() => error);
  }
}
