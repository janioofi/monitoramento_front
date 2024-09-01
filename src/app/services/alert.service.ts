import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/log';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private url: string = `${API_CONFIG.baseUrl}/v1/alerts`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.url);
  }

  create(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(this.url, alert);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
