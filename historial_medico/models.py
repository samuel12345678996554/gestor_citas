from django.db import models
from pacientes.models import Paciente
from medicos.models import Medico

class HistorialMedico(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="historiales")
    medico = models.ForeignKey(Medico, on_delete=models.SET_NULL, null=True, blank=True)
    fecha = models.DateField()
    descripcion = models.TextField()
    diagnostico = models.CharField(max_length=255)
    tratamiento = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.paciente.nombre} - {self.fecha}"
