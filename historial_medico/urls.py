from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HistorialMedicoViewSet   # <-- IMPORTA tu ViewSet real
# from .views import PacienteViewSet       # <-- Solo si realmente existe

router = DefaultRouter()
router.register('historiales', HistorialMedicoViewSet)
# router.register('pacientes', PacienteViewSet)  # <-- QUÍTALO SI NO EXISTE

urlpatterns = [
    path('', include(router.urls)),
]
