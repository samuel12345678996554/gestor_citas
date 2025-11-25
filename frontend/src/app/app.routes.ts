import { Routes } from '@angular/router';

// Citas
import { GetAll as CitasGetall } from './components/citas/getall/getall';
import { CitaCreate } from "./components/citas/create/create";
import { Update as CitasUpdate } from './components/citas/update/update';
import { Delete as CitasDelete } from './components/citas/delete/delete';

// Especialidades
import { Getall as EspecialidadGetall } from './components/especialidad/getall/getall';
import { Create as EspecialidadCreate } from './components/especialidad/create/create';
import { Update as EspecialidadUpdate } from './components/especialidad/update/update';
import { Delete as EspecialidadDelete } from './components/especialidad/delete/delete';


// Historial Medico
import { Getall as HistorialGetall } from './components/historial_medico/getall/getall';
import { Create as HistorialCreate } from './components/historial_medico/create/create';
import { Update as HistorialUpdate } from './components/historial_medico/update/update';
import { Delete as HistorialDelete } from './components/historial_medico/delete/delete';


// Médicos
import { Getall as MedicosGetall } from './components/medicos/getall/getall';
import { Create as MedicosCreate } from './components/medicos/create/create';
import { Update as MedicosUpdate } from './components/medicos/update/update';
import { Delete as MedicosDelete } from './components/medicos/delete/delete';

// Pacientes
import { Getall as PacientesGetall } from './components/pacientes/getall/getall';
import { Create as PacientesCreate } from './components/pacientes/create/create';
import { Update as PacientesUpdate } from './components/pacientes/update/update';
import { Delete as PacientesDelete } from './components/pacientes/delete/delete';

export const routes: Routes = [
  { path: '', redirectTo: '/citas', pathMatch: 'full' },

  // Citas
  { path: 'citas', component: CitasGetall },
  {path: 'citas/create', component: CitaCreate},
  { path: 'citas/edit/:id', component: CitasUpdate },
  { path: 'citas/delete/:id', component: CitasDelete },

  // Especialidades
  { path: 'especialidades', component: EspecialidadGetall },
  { path: 'especialidades/new', component: EspecialidadCreate },
  { path: 'especialidades/edit/:id', component: EspecialidadUpdate },
  { path: 'especialidades/delete/:id', component: EspecialidadDelete },

  // Historial Médico
  { path: 'historial_medico', component: HistorialGetall },
  { path: 'historial_medico/create', component: HistorialCreate },
  { path: 'historial_medico/update/:id', component: HistorialUpdate },
  { path: 'historial_medico/delete/:id', component: HistorialDelete },

  // Médicos
  { path: 'medicos', component: MedicosGetall },
  { path: 'medicos/new', component: MedicosCreate },
  { path: 'medicos/edit/:id', component: MedicosUpdate },
  { path: 'medicos/delete/:id', component: MedicosDelete },

  // Pacientes
  { path: 'pacientes', component: PacientesGetall },
  { path: 'pacientes/new', component: PacientesCreate },
  { path: 'pacientes/edit/:id', component: PacientesUpdate },
  { path: 'pacientes/delete/:id', component: PacientesDelete },
];
