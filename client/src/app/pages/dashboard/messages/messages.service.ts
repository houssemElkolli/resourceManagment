import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  constructor(private http: HttpClient) {}
  public headers = new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
  });
  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/messages', {
      headers: this.headers,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>('http://localhost:3001/messages/' + id, {
      headers: this.headers,
    });
  }
}
