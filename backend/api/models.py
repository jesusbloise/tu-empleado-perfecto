from django.db import models

class Empresa(models.Model):
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    rut = models.CharField(max_length=12)

    def __str__(self):
        return self.nombre

class Empleado(models.Model):
    nombre_completo = models.CharField(max_length=100, default='Sin nombre')
    rut = models.CharField(max_length=12)
    email = models.EmailField()
    empresa = models.ForeignKey(Empresa, related_name='empleados', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
