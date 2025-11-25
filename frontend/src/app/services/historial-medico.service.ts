import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HistorialMedicoI } from '../models/historial-medico';

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {

  // 🔴 URL CORREGIDA
  private apiUrl = 'http://localhost:8000/historial/historiales/';

  private historialesList = new BehaviorSubject<HistorialMedicoI[]>([]);
  historiales$ = this.historialesList.asObservable();

  constructor(private http: HttpClient) {}

  getAllHistoriales(): Observable<HistorialMedicoI[]> {
    return this.http.get<HistorialMedicoI[]>(this.apiUrl);
  }

  getById(id: number): Observable<HistorialMedicoI> {
    return this.http.get<HistorialMedicoI>(`${this.apiUrl}${id}/`);
  }

  createHistorial(data: HistorialMedicoI): Observable<HistorialMedicoI> {
    return this.http.post<HistorialMedicoI>(this.apiUrl, data);
  }

  updateHistorial(id: number, data: HistorialMedicoI): Observable<HistorialMedicoI> {
    return this.http.put<HistorialMedicoI>(`${this.apiUrl}${id}/`, data);
  }

  deleteHistorial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  setHistoriales(historiales: HistorialMedicoI[]): void {
    this.historialesList.next(historiales);
  }
}
