import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HistorialMedicoService } from '../../../services/historial-medico.service';
import { PacienteService } from '../../../services/paciente.service';
import { MedicoService } from '../../../services/medico.service';
import { HistorialMedicoI } from '../../../models/historial-medico';

@Component({
  selector: 'app-historial-update',
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
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update implements OnInit {
  form: FormGroup;
  loading = false;
  id!: number;

  pacientes: any[] = [];
  medicos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private historialService: HistorialMedicoService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
  paciente: ['', [Validators.required]],
  medico: ['', [Validators.required]],
  fecha: ['', [Validators.required]],
  diagnostico: ['', [Validators.required]],
  tratamiento: ['', [Validators.required]],
  descripcion: ['', [Validators.required]]  // <-- ahora coincide con la API
});

  }

  ngOnInit(): void {
    // Traer pacientes y médicos
    this.pacienteService.getAllPacientes().subscribe(res => this.pacientes = res);
    this.medicoService.getAllMedicos().subscribe(res => this.medicos = res);

    // Traer historial
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.historialService.getById(this.id).subscribe({
      next: (historial: HistorialMedicoI) => {
        // Patch con IDs de paciente y médico
        this.form.patchValue({
  paciente: historial.pacienteNombre,
  medico: historial.medicoNombre,
  fecha: historial.fecha,
  diagnostico: historial.diagnostico,
  tratamiento: historial.tratamiento,
  descripcion: historial.observaciones  // <-- ahora coincide con el formControlName
});

      },
      error: (err) => {
        console.error('Error cargando historial:', err);
        this.snackBar.open('No se pudo cargar el historial', 'Cerrar', { duration: 3000 });
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.historialService.updateHistorial(this.id, this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Historial actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/historial']);
        },
        error: (err) => {
          console.error('Error actualizando historial:', err);
          this.snackBar.open('No se pudo actualizar el historial', 'Cerrar', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      this.snackBar.open('Complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
    }
  }

  cancelar(): void {
    this.router.navigate(['/historial']);
  }
}
