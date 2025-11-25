export interface HistorialMedicoI {
  id?: number;
  pacienteNombre: string;
  medicoNombre: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  observaciones?: string;
}
