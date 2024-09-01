import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Device } from '../models/device';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url: string = `${API_CONFIG.baseUrl}/v1/devices`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  create(device: Device): Observable<Device> {
    return this.http.post<Device>(this.url, device).pipe(
      catchError(this.handleError)
    );
  }

  findById(id: string): Observable<Device> {
    return this.http.get<Device>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.url}/${id}`, device).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getDeviceLogs(idDevice: string): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.url}/${idDevice}/logs`);
  }

  // Função para lidar com erros HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
