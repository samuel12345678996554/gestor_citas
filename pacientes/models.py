from django.db import models
from django.contrib.auth.models import User

class Paciente(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='paciente')
    documento = models.CharField(max_length=20, unique=True)
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.CharField(max_length=200, blank=True)
    contacto_emergencia = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.usuario.first_name} {self.usuario.last_name}"
