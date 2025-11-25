from django.contrib import admin
from .models import Cita

@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'hora_inicio', 'paciente', 'medico', 'estado_cita')  # <-- coincide con tu modelo
    list_filter = ('estado_cita', 'fecha')  # <-- coincide con tu modelo
    search_fields = ('paciente__usuario__first_name', 'medico__usuario__first_name')
