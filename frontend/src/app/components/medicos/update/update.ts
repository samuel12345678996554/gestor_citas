import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { MedicoService } from '../../../services/medico.service';
import { MedicoI } from '../../../models/medico';

@Component({
  selector: 'app-medicos-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Button, InputText],
  providers: [MessageService],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update implements OnInit {
  medico: MedicoI = { nombre: '', especialidad: '', email: '', telefono: '' };
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicoService: MedicoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMedico();
  }

  loadMedico(): void {
    this.medicoService.getAllMedicos().subscribe({
      next: (medicos) => {
        const m = medicos.find(med => med.id === this.id);
        if (m) this.medico = m;
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el médico' });
      }
    });
  }

  update(): void {
    this.medicoService.updateMedico(this.id, this.medico).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Médico actualizado correctamente' });
        this.router.navigate(['/medicos']);
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el médico' });
      }
    });
  }
}
