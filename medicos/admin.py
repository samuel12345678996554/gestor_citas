from django.contrib import admin
from .models import Medico

@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'especialidad', 'telefono', 'email')
    search_fields = ('nombre', 'apellido', 'especialidad', 'email')
