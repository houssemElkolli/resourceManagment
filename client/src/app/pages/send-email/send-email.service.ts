import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SendEmailService {
  constructor(private http: HttpClient) {}

  sendMessage(data: any, messageId: number): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3001/messages/send/' + messageId,
      data
    );
  }
}
