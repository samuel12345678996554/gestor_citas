import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Modules correctos
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { MedicoI } from '../../../models/medico';

@Component({
  selector: 'app-medico-getall',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css']
})
export class Getall implements OnInit, OnDestroy {
  medicos: MedicoI[] = [];
  loading = false;
  private subscription = new Subscription();

  constructor(
    private medicoService: MedicoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMedicos();

    this.subscription.add(
      this.medicoService.medicos$.subscribe((medicos: MedicoI[]) => {
        this.medicos = medicos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadMedicos(): void {
    this.loading = true;
    this.subscription.add(
      this.medicoService.getAllMedicos().subscribe({
        next: (medicos: MedicoI[]) => {
          this.medicos = medicos;
          this.medicoService.setMedicos(medicos);
          this.loading = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los médicos'
          });
          this.loading = false;
        }
      })
    );
  }

  confirmDelete(medico: MedicoI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar a ${medico.nombre}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteMedico(medico.id!);
      }
    });
  }

  deleteMedico(id: number): void {
    this.subscription.add(
      this.medicoService.deleteMedico(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Médico eliminado correctamente'
          });
          this.loadMedicos();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el médico'
          });
        }
      })
    );
  }
}
