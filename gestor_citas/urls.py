"""
URL configuration for gestor_citas project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('pacientes.urls')),
    path('medicos/', include('medicos.urls')),
    path('api/', include('medicos.urls')),
    path('especialidad/', include('especialidad.urls')),  
    path('api/', include('especialidad.urls')),          
    path('api/citas/', include('citas.urls')),
    path("historial/", include("historial_medico.urls")),
    path('api/', include('historial_medico.urls')),


]

