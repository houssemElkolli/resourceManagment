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
      .post<any>('http://localhost:3001/messages', data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Item not found');
    } else if (error.status === 400) {
      console.error('Server error');
    } else if (error.status === 500) {
      console.error('Server error');
    } else {
      console.error('An error occurred:', error);
    }
    return throwError(() => error);
  }
}
