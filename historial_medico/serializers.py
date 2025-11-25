from rest_framework import serializers
from .models import HistorialMedico

class HistorialMedicoSerializer(serializers.ModelSerializer):
    pacienteNombre = serializers.CharField(source="paciente.nombre", read_only=True)
    medicoNombre = serializers.CharField(source="medico.nombre", read_only=True)

    class Meta:
        model = HistorialMedico
        fields = [
            'id',
            'paciente',
            'pacienteNombre',
            'medico',
            'medicoNombre',
            'fecha',
            'descripcion',
            'diagnostico',
            'tratamiento',
        ]
