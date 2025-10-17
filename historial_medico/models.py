from django.db import models
from pacientes.models import Paciente
from citas.models import Cita

class HistorialMedico(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='historiales')
    cita = models.OneToOneField(Cita, on_delete=models.SET_NULL, null=True, blank=True)
    diagnostico = models.TextField()
    tratamiento = models.TextField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Historial de {self.paciente} - {self.fecha_registro.date()}"
