import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EspecialidadService } from '../../../services/especialidad';
import { EspecialidadI } from '../../../models/especialidad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidad-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css'],
  providers: [MessageService]
})
export class Update {
  form: FormGroup;
  loading = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private especialidadService: EspecialidadService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.especialidadService.getEspecialidadById(this.id).subscribe({
      next: (res) => this.form.patchValue(res),
      error: (err) => console.error(err)
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const data: Partial<EspecialidadI> = this.form.value;

      this.especialidadService.updateEspecialidad(this.id, data).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Especialidad actualizada correctamente'
          });
          this.router.navigate(['/especialidades']);
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la especialidad'
          });
          this.loading = false;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.router.navigate(['/especialidades']);
  }
}
