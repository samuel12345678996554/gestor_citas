import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EspecialidadService } from '../../../services/especialidad';
import { EspecialidadI } from '../../../models/especialidad';

@Component({
  selector: 'app-especialidad-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css'],
  providers: [MessageService]
})
export class Create {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private especialidadService: EspecialidadService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const data: EspecialidadI = this.form.value;

      this.especialidadService.createEspecialidad(data).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Especialidad creada correctamente'
          });
          this.router.navigate(['/especialidades']);
        },
        error: (error) => {
          console.error('Error creando especialidad:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la especialidad'
          });
          this.loading = false;
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete el nombre de la especialidad'
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/especialidades']);
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return 'Nombre es requerido';
      if (field.errors['minlength'])
        return `Nombre debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
