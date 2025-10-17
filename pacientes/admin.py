from django.contrib import admin
from .models import Paciente

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'documento', 'telefono')
    search_fields = ('usuario__first_name', 'usuario__last_name', 'documento')
