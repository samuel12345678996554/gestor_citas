import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private apiUrl = 'http://127.0.0.1:8000/api/medicos/';
  private medicosList = new BehaviorSubject<any[]>([]);
  medicos$ = this.medicosList.asObservable();

  constructor(private http: HttpClient) {}

  // renombrar para coincidir con los componentes
  getAllMedicos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteMedico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  updateMedico(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  createMedico(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  setMedicos(medicos: any[]) {
    this.medicosList.next(medicos);
  }
}
