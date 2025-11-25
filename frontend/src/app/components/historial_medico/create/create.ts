import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { HistorialMedicoService } from '../../../services/historial-medico.service';
import { PacienteService } from '../../../services/paciente.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-historial-create',
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
  loading = false;

  pacientes: any[] = [];
  medicos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private historialService: HistorialMedicoService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      paciente: ['', [Validators.required]],
      medico: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      tratamiento: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.pacienteService.getAllPacientes().subscribe(res => this.pacientes = res);
    this.medicoService.getAllMedicos().subscribe(res => this.medicos = res);
  }

  submit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Complete todos los campos', 'Cerrar', { duration: 3000 });
      return;
    }

    this.loading = true;

    this.historialService.createHistorial(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Historial creado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/historial']);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo crear el historial', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/historial']);
  }
}
