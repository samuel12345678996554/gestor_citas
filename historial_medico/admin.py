from django.contrib import admin
from .models import HistorialMedico

@admin.register(HistorialMedico)
class HistorialMedicoAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'fecha_registro', 'diagnostico')
    search_fields = ('paciente__usuario__first_name', 'diagnostico')
