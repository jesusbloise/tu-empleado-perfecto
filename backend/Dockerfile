
FROM python:3.10-slim
WORKDIR /app
RUN pip install --no-cache-dir django gunicorn psycopg2-binary djangorestframework django-cors-headers
COPY . .
EXPOSE 8000
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]

