import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

// Service
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-getall',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,   

    // PrimeNG
    TableModule,
    CardModule,
    TagModule,
    ToastModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [MessageService],
  templateUrl: './getall.html',
  styleUrl: './getall.css'
})
export class GetAll implements OnInit {

  citas: any[] = [];
  loading = true;
  filtroGlobal = '';

  constructor(
    private service: CitaService,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las citas' });
        this.loading = false;
      }
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Eliminado', detail: 'La cita fue eliminada' });
        this.loadCitas();
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la cita' });
      }
    });
  }
}
