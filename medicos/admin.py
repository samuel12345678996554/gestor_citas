from django.contrib import admin
from .models import Medico

@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'numero_licencia', 'activo')
    list_filter = ('activo',)
    search_fields = ('usuario__first_name', 'usuario__last_name', 'numero_licencia')
