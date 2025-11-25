from rest_framework.routers import DefaultRouter
from .views import CitaViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'', CitaViewSet, basename='cita')

urlpatterns = [
    path('', include(router.urls)),
]
