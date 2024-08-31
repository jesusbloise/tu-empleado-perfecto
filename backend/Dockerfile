# backend/Dockerfile

# Usa una imagen base de Python
FROM python:3.10-slim

# Configura el directorio de trabajo
WORKDIR /app

# Instala las dependencias necesarias
RUN pip install --no-cache-dir django gunicorn psycopg2-binary djangorestframework django-cors-headers

# Copia el código fuente de tu aplicación al contenedor
COPY . .

# Expone el puerto en el que Django corre
EXPOSE 8000

# Define el comando para ejecutar tu aplicación Django
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]

