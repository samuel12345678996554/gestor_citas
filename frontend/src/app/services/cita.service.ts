import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://localhost:8000/api/citas/';

  // 🔵 Estado reactivo igual que Historial Médico
  private citasSubject = new BehaviorSubject<Cita[]>([]);
  citas$ = this.citasSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 🔵 Actualiza la lista global
  setCitas(data: Cita[]) {
    this.citasSubject.next(data);
  }

  // 🔵 Obtener todas las citas
  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  // 🔵 Obtener una cita por ID
  getById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}${id}/`);
  }

  // 🔵 Crear cita
  create(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  // 🔵 Actualizar cita
  update(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}${id}/`, cita);
  }

  // 🔵 Eliminar cita
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
