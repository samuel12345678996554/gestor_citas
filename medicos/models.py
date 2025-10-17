from django.db import models
from django.contrib.auth.models import User
from especialidades.models import Especialidad

class Medico(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medico')
    numero_licencia = models.CharField(max_length=50, unique=True)
    telefono = models.CharField(max_length=20, blank=True)
    activo = models.BooleanField(default=True)
    especialidades = models.ManyToManyField(Especialidad, related_name='medicos', blank=True)

    def __str__(self):
        return f"Dr. {self.usuario.first_name} {self.usuario.last_name}"
