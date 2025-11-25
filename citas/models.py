from django.db import models
from pacientes.models import Paciente
from medicos.models import Medico

class Cita(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada')
    ]

    fecha = models.DateField()
    hora_inicio = models.TimeField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    estado_cita = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    
    def __str__(self):
        return f"Cita de {self.paciente} con {self.medico} - {self.fecha}"
