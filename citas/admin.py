from django.contrib import admin
from .models import Cita

@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'hora_inicio', 'paciente', 'medico', 'estado')
    list_filter = ('estado', 'fecha')
    search_fields = ('paciente__usuario__first_name', 'medico__usuario__first_name')
