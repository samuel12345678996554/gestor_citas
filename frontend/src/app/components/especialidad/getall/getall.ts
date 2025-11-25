import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EspecialidadService } from '../../../services/especialidad';
import { EspecialidadResponseI } from '../../../models/especialidad';

@Component({
  selector: 'app-especialidad-getall',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    Button,
    ConfirmDialog,
    Toast,
    Tooltip
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css']
})
export class Getall implements OnInit, OnDestroy {
  especialidades: EspecialidadResponseI[] = [];
  loading = false;
  private subscription = new Subscription();

  constructor(
    private especialidadService: EspecialidadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadEspecialidades();

    this.subscription.add(
      this.especialidadService.especialidades$.subscribe(especialidades => {
        this.especialidades = especialidades;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadEspecialidades(): void {
    this.loading = true;
    this.subscription.add(
      this.especialidadService.getAllEspecialidades().subscribe({
        next: (especialidades) => {
          this.especialidades = especialidades;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando especialidades:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar las especialidades'
          });
          this.loading = false;
        }
      })
    );
  }

  confirmDelete(especialidad: EspecialidadResponseI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar la especialidad "${especialidad.nombre}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteEspecialidad(especialidad.id!)
    });
  }

  deleteEspecialidad(id: number): void {
    this.subscription.add(
      this.especialidadService.deleteEspecialidad(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Especialidad eliminada correctamente'
          });
          this.loadEspecialidades();
        },
        error: (error) => {
          console.error('Error eliminando especialidad:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la especialidad'
          });
        }
      })
    );
  }
}
