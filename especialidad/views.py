from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Especialidad
from .forms import EspecialidadForm

# Vistas tradicionales de Django
class EspecialidadListView(ListView):
    model = Especialidad
    template_name = 'especialidad/especialidad_list.html'
    context_object_name = 'especialidades'


class EspecialidadDetailView(DetailView):
    model = Especialidad
    template_name = 'especialidad/especialidad_detail.html'
    context_object_name = 'especialidad'


class EspecialidadCreateView(CreateView):
    model = Especialidad
    form_class = EspecialidadForm
    template_name = 'especialidad/especialidad_form.html'
    success_url = reverse_lazy('especialidad:lista')


class EspecialidadUpdateView(UpdateView):
    model = Especialidad
    form_class = EspecialidadForm
    template_name = 'especialidad/especialidad_form.html'
    success_url = reverse_lazy('especialidad:lista')


class EspecialidadDeleteView(DeleteView):
    model = Especialidad
    template_name = 'especialidad/especialidad_confirm_delete.html'
    success_url = reverse_lazy('especialidad:lista')


# ============================
#   API REST para Angular
# ============================
from rest_framework import viewsets
from .serializers import EspecialidadSerializer

class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer