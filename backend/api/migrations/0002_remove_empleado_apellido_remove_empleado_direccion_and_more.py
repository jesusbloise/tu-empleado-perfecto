# Generated by Django 5.1 on 2024-08-30 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='empleado',
            name='apellido',
        ),
        migrations.RemoveField(
            model_name='empleado',
            name='direccion',
        ),
        migrations.RemoveField(
            model_name='empleado',
            name='email',
        ),
        migrations.RemoveField(
            model_name='empleado',
            name='fecha_contratacion',
        ),
        migrations.RemoveField(
            model_name='empleado',
            name='puesto',
        ),
        migrations.RemoveField(
            model_name='empresa',
            name='ciudad',
        ),
        migrations.RemoveField(
            model_name='empresa',
            name='descripcion',
        ),
        migrations.RemoveField(
            model_name='empresa',
            name='email',
        ),
        migrations.RemoveField(
            model_name='empresa',
            name='pais',
        ),
        migrations.AddField(
            model_name='empleado',
            name='correo',
            field=models.EmailField(default='no-reply@example.com', max_length=254),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='empleado',
            name='telefono',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='empresa',
            name='telefono',
            field=models.CharField(max_length=20),
        ),
    ]
