import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PacienteService } from '../../../services/paciente.service';
import { PacienteResponseI } from '../../../models/paciente';

@Component({
  selector: 'app-paciente-getall',
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
  styleUrl: './getall.css'
})
export class Getall implements OnInit, OnDestroy {
  
  pacientes: PacienteResponseI[] = [];
  loading = false;
  private subscription = new Subscription();

  constructor(
    private pacienteService: PacienteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPacientes();

    // escuchar actualizaciones
    this.subscription.add(
      this.pacienteService.pacientes$.subscribe(p => this.pacientes = p)
    );
  }

  loadPacientes(): void {
    this.loading = true;

    this.subscription.add(
      this.pacienteService.getAllPacientes().subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
          this.loading = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los pacientes'
          });
          this.loading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  confirmDelete(paciente: PacienteResponseI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar a ${paciente.nombre} ${paciente.apellido}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deletePaciente(paciente.id!)
    });
  }

  deletePaciente(id: number): void {
    this.subscription.add(
      this.pacienteService.deletePaciente(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Paciente eliminado correctamente'
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el paciente'
          });
        }
      })
    );
  }
}
