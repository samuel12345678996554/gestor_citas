# medicos/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import MedicoViewSet

router = DefaultRouter()
router.register(r'medicos', MedicoViewSet, basename='medicos')

urlpatterns = [
    path('', include(router.urls)),
]
