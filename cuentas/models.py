from django.db import models
from django.contrib.auth.models import User

class PerfilUsuario(models.Model):
    ROLES = [
        ('paciente', 'Paciente'),
        ('medico', 'Médico'),
        ('recepcion', 'Recepcionista'),
        ('admin', 'Administrador'),
    ]

    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    rol = models.CharField(max_length=20, choices=ROLES, default='paciente')

    def __str__(self):
        return f"{self.usuario.username} ({self.get_rol_display()})"
