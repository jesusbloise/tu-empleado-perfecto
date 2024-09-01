from rest_framework import serializers
from .models import Empresa, Empleado

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = ['id', 'nombre_completo', 'rut', 'email', 'empresa']
