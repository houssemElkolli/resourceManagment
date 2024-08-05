import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}
  public headers = new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
  });
  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/users', {
      headers: this.headers,
    });
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('http://localhost:3001/users/' + id, {
      headers: this.headers,
    });
  }
}
