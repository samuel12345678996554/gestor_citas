import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CitaService } from '../../../services/cita.service';
import { PacienteService } from '../../../services/paciente.service';
import { MedicoService } from '../../../services/medico.service';

import { Cita } from '../../../models/cita';
import { PacienteI } from '../../../models/paciente';
import { MedicoI } from '../../../models/medico';

@Component({
  selector: 'app-cita-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './update.html'
})
export class Update implements OnInit {

  form!: FormGroup;
  pacientes: PacienteI[] = [];
  medicos: MedicoI[] = [];

  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      paciente: ['', Validators.required],
      medico: ['', Validators.required],
      estado_cita: ['', Validators.required],
    });

    this.loadPacientes();
    this.loadMedicos();
    this.loadCita();
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

  loadCita() {
    this.citaService.getById(this.id).subscribe((res: Cita) => {
      this.form.patchValue(res);
    });
  }

  update() {
    if (this.form.invalid) return;

    const cita: Cita = this.form.value;

    this.citaService.update(this.id, cita).subscribe({
      next: () => {
        alert("Cita actualizada correctamente");
        this.router.navigate(['/citas/getall']);
      },
      error: () => {
        alert("No se pudo actualizar la cita");
      }
    });
  }
}
