import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MedicoService } from '../../../services/medico.service';
import { EspecialidadService } from '../../../services/especialidad';

@Component({
  selector: 'app-create-medico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class Create implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  especialidades: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      especialidad: [null, Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  loadEspecialidades(): void {
    this.especialidadService.getAllEspecialidades().subscribe({
      next: (res) => this.especialidades = res,
      error: (err) => console.error('Error loading especialidades:', err)
    });
  }

  // 📌 Método para mostrar errores de validación en inputs
  getFieldError(field: string): string | null {
    const control = this.form.get(field);

    if (control && control.touched && control.invalid) {
      if (control.errors?.['required']) {
        return 'Este campo es obligatorio';
      }
      if (control.errors?.['minlength']) {
        return `Debe tener mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors?.['email']) {
        return 'Correo electrónico inválido';
      }
      if (control.errors?.['pattern']) {
        return 'Formato inválido';
      }
    }
    return null;
  }

  cancelar(): void {
    this.router.navigate(['/medicos']);
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.medicoService.createMedico(this.form.value).subscribe({
        next: (res: any) => {
          this.medicoService.getAllMedicos().subscribe((medicos: any[]) => {
            this.medicoService.setMedicos(medicos);
          });

          this.snackBar.open('Médico creado correctamente', 'Cerrar', { duration: 3000 });
          setTimeout(() => this.router.navigate(['/medicos']), 500);
        },
        error: (err: any) => {
          console.error('Error creating medico:', err);
          this.snackBar.open('No se pudo crear el médico', 'Cerrar', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor completa los campos obligatorios', 'Cerrar', { duration: 3000 });
    }
  }
}
