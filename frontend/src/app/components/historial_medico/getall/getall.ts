import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';     // ✅ NECESARIO PARA MOSTRAR p-button
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { HistorialMedicoService } from '../../../services/historial-medico.service';
import { HistorialMedicoI } from '../../../models/historial-medico';

@Component({
  selector: 'app-historial-getall',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,       // ✅ SIN ESTO LOS BOTONES NO SALEN
    ConfirmDialog,
    Toast,
    Tooltip
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css']
})
export class Getall implements OnInit, OnDestroy {

  historiales: HistorialMedicoI[] = [];
  loading = false;
  private subscription = new Subscription();

  constructor(
    private historialService: HistorialMedicoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadHistoriales();

    this.subscription.add(
      this.historialService.historiales$.subscribe((data: HistorialMedicoI[]) => {
        this.historiales = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadHistoriales(): void {
    this.loading = true;

    this.subscription.add(
      this.historialService.getAllHistoriales().subscribe({
        next: (data: HistorialMedicoI[]) => {
          this.historiales = data;
          this.historialService.setHistoriales(data);
          this.loading = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los historiales'
          });
          this.loading = false;
        }
      })
    );
  }

  confirmDelete(historial: HistorialMedicoI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar el historial de ${historial.pacienteNombre}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteHistorial(historial.id!)
    });
  }

  deleteHistorial(id: number): void {
    this.subscription.add(
      this.historialService.deleteHistorial(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Historial eliminado correctamente'
          });
          this.loadHistoriales();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el historial'
          });
        }
      })
    );
  }
}
