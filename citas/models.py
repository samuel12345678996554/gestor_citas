from django.db import models
from medicos.models import Medico
from pacientes.models import Paciente

class Cita(models.Model):
    ESTADOS = [
        ('programada', 'Programada'),
        ('confirmada', 'Confirmada'),
        ('completada', 'Completada'),
        ('cancelada', 'Cancelada'),
    ]

    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='citas')
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, related_name='citas')
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    motivo = models.CharField(max_length=200)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='programada')

    def __str__(self):
        return f"Cita de {self.paciente} con {self.medico} el {self.fecha}"
