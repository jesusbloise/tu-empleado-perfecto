# api/views.py

from rest_framework import viewsets
from .models import Empresa, Empleado
from .serializers import EmpresaSerializer, EmpleadoSerializer
from rest_framework.response import Response

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()

    def list(self, request, *args, **kwargs):
        empresa_id = request.query_params.get('empresa')
        if empresa_id:
            self.queryset = self.queryset.filter(empresa_id=empresa_id)
        return super().list(request, *args, **kwargs)