import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/clients');
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('http://localhost:3001/clients/' + id);
  }
}
