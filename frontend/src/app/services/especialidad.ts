import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { EspecialidadI, EspecialidadResponseI } from '../models/especialidad';

// Interfaz para la respuesta paginada de Django
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private baseUrl = 'http://localhost:8000/api/especialidades';
  private especialidadesSubject = new BehaviorSubject<EspecialidadResponseI[]>([]);
  public especialidades$ = this.especialidadesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllEspecialidades(): Observable<EspecialidadResponseI[]> {
  return this.http.get<EspecialidadResponseI[]>(`${this.baseUrl}/`)
    .pipe(
      tap(especialidades => this.especialidadesSubject.next(especialidades)),
      catchError(error => throwError(() => error))
    );


  }

  getEspecialidadById(id: number): Observable<EspecialidadResponseI> {
    return this.http.get<EspecialidadResponseI>(`${this.baseUrl}/${id}/`)
      .pipe(
        catchError(error => {
          console.error('Error fetching especialidad:', error);
          return throwError(() => error);
        })
      );
  }

  createEspecialidad(especialidad: EspecialidadI): Observable<EspecialidadResponseI> {
    return this.http.post<EspecialidadResponseI>(`${this.baseUrl}/`, especialidad)
      .pipe(
        tap(response => {
          console.log('Especialidad created:', response);
          this.refreshEspecialidades();
        }),
        catchError(error => {
          console.error('Error creating especialidad:', error);
          return throwError(() => error);
        })
      );
  }

  updateEspecialidad(id: number, especialidad: Partial<EspecialidadI>): Observable<EspecialidadResponseI> {
    return this.http.put<EspecialidadResponseI>(`${this.baseUrl}/${id}/`, especialidad)
      .pipe(
        tap(response => {
          console.log('Especialidad updated:', response);
          this.refreshEspecialidades();
        }),
        catchError(error => {
          console.error('Error updating especialidad:', error);
          return throwError(() => error);
        })
      );
  }

  partialUpdateEspecialidad(id: number, especialidad: Partial<EspecialidadI>): Observable<EspecialidadResponseI> {
    return this.http.patch<EspecialidadResponseI>(`${this.baseUrl}/${id}/`, especialidad)
      .pipe(
        tap(response => {
          console.log('Especialidad partially updated:', response);
          this.refreshEspecialidades();
        }),
        catchError(error => {
          console.error('Error partially updating especialidad:', error);
          return throwError(() => error);
        })
      );
  }

  deleteEspecialidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/`)
      .pipe(
        tap(() => {
          console.log('Especialidad deleted:', id);
          this.refreshEspecialidades();
        }),
        catchError(error => {
          console.error('Error deleting especialidad:', error);
          return throwError(() => error);
        })
      );
  }

  // Método para actualizar el estado local de especialidades
  updateLocalEspecialidades(especialidades: EspecialidadResponseI[]): void {
    this.especialidadesSubject.next(especialidades);
  }

  refreshEspecialidades(): void {
    this.getAllEspecialidades().subscribe({
      next: (especialidades) => {
        this.especialidadesSubject.next(especialidades);
      },
      error: (error) => {
        console.error('Error refreshing especialidades:', error);
      }
    });
  }
}