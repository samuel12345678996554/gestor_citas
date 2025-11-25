export interface Cita {
  id?: number;
  fecha: string;
  hora_inicio: string;
  paciente: number;     // ID del paciente
  medico: number;       // ID del médico
  estado_cita: string;
}
