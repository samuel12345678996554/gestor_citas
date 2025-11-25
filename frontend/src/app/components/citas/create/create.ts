import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CitaService } from '../../../services/cita.service';
import { PacienteService } from '../../../services/paciente.service';
import { MedicoService } from '../../../services/medico.service';

import { Cita } from '../../../models/cita';
import { PacienteI } from '../../../models/paciente';
import { MedicoI } from '../../../models/medico';

@Component({
  selector: 'app-cita-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './create.html'
})
export class CitaCreate implements OnInit {

  form!: FormGroup;
  pacientes: PacienteI[] = [];
  medicos: MedicoI[] = [];

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      paciente: ['', Validators.required],
      medico: ['', Validators.required],
      estado_cita: ['Programada', Validators.required]
    });

    this.loadPacientes();
    this.loadMedicos();
  }

  loadPacientes() {
    this.pacienteService.getAllPacientes().subscribe((res: PacienteI[]) => {
      this.pacientes = res;
    });
  }

  loadMedicos() {
    this.medicoService.getAllMedicos().subscribe((res: MedicoI[]) => {
      this.medicos = res;
    });
  }

  submit() {
    if (this.form.invalid) {
      alert('Debe completar todos los campos');
      return;
    }

    const cita: Cita = this.form.value;

    this.citaService.create(cita).subscribe({
      next: () => {
        alert('Cita creada correctamente');
        this.router.navigate(['/citas/getall']);
      },
      error: () => {
        alert('Error al crear la cita');
      }
    });
  }
}
