import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { PacienteI, PacienteResponseI } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private baseUrl = 'http://localhost:8000/api/pacientes';
  private pacientesSubject = new BehaviorSubject<PacienteResponseI[]>([]);
  public pacientes$ = this.pacientesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ✔ CORREGIDO: El backend devuelve un arreglo plano
  getAllPacientes(): Observable<PacienteResponseI[]> {
    return this.http.get<PacienteResponseI[]>(`${this.baseUrl}/`)
      .pipe(
        tap(pacientes => {
          console.log("Pacientes cargados desde API:", pacientes);
          this.pacientesSubject.next(pacientes);
        }),
        catchError(error => {
          console.error('Error fetching pacientes:', error);
          return throwError(() => error);
        })
      );
  }

  getPacienteById(id: number): Observable<PacienteResponseI> {
    return this.http.get<PacienteResponseI>(`${this.baseUrl}/${id}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching paciente:', error);
          return throwError(() => error);
        })
      );
  }

  createPaciente(paciente: PacienteI): Observable<PacienteResponseI> {
    return this.http.post<PacienteResponseI>(`${this.baseUrl}/`, paciente)
      .pipe(
        tap(() => this.refreshPacientes()),
        catchError(error => {
          console.error('Error creating paciente:', error);
          return throwError(() => error);
        })
      );
  }

  updatePaciente(id: number, paciente: Partial<PacienteI>): Observable<PacienteResponseI> {
    return this.http.put<PacienteResponseI>(`${this.baseUrl}/${id}/`, paciente)
      .pipe(
        tap(() => this.refreshPacientes()),
        catchError(error => {
          console.error('Error updating paciente:', error);
          return throwError(() => error);
        })
      );
  }

  partialUpdatePaciente(id: number, paciente: Partial<PacienteI>): Observable<PacienteResponseI> {
    return this.http.patch<PacienteResponseI>(`${this.baseUrl}/${id}/`, paciente)
      .pipe(
        tap(() => this.refreshPacientes()),
        catchError(error => {
          console.error('Error partially updating paciente:', error);
          return throwError(() => error);
        })
      );
  }

  deletePaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/`)
      .pipe(
        tap(() => this.refreshPacientes()),
        catchError(error => {
          console.error('Error deleting paciente:', error);
          return throwError(() => error);
        })
      );
  }

  refreshPacientes(): void {
    this.getAllPacientes().subscribe();
  }
}
