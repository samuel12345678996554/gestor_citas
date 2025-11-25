from rest_framework import viewsets
from .models import HistorialMedico
from .serializers import HistorialMedicoSerializer

class HistorialMedicoViewSet(viewsets.ModelViewSet):
    queryset = HistorialMedico.objects.all()
    serializer_class = HistorialMedicoSerializer
