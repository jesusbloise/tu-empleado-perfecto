# tu-empleado-perfecto

Descripción del Proyecto
Este proyecto implementa una aplicación full-stack con una interfaz de usuario en React, un backend en Python con Django, y una base de datos en PostgreSQL. A continuación se detalla cada componente del sistema:

Frontend
El frontend está desarrollado utilizando React y se organiza en una carpeta dedicada denominada frontend. La aplicación incluye tres pantallas interactivas:

Home: Pantalla principal que proporciona una visión general de la aplicación.
Empresas: Permite gestionar las empresas, incluyendo registrar, visualizar, modificar y eliminar empresas.
Empleados: Facilita la gestión de empleados, permitiendo seleccionar una empresa, ver los empleados asociados a ella, agregar nuevos empleados, así como editar y eliminar registros existentes.

Estas pantallas cumplen con los requisitos del proyecto y se comunican eficazmente con el backend para solicitar y mostrar la información correspondiente.

Backend
El backend está desarrollado en Python utilizando el framework Django. Su función principal es recibir y procesar las solicitudes del frontend, consultar la base de datos y devolver la información requerida. Esto se logra mediante la implementación de una API REST, que expone los servicios necesarios para la correcta funcionalidad de la aplicación.

Base de Datos
Se ha implementado una base de datos en PostgreSQL que consta de dos tablas relacionadas:

Empresas: Tabla que almacena la información de las empresas.
Empleados: Tabla que almacena la información de los empleados y está relacionada con la tabla de empresas.
La relación entre estas tablas permite una gestión eficiente de los datos y facilita la obtención de información relevante.

Opcional
Se ha incluido un archivo docker-compose.yml que encapsula toda la aplicación para facilitar el transporte y la implementación. Esto proporciona una solución de despliegue más eficiente y estandarizada para quienes necesiten utilizar el proyecto.

Despliegue
Se ha creado una instancia en AWS EC2 para el despliegue de la aplicación. La instancia está actualmente en ejecución, permitiendo la disponibilidad del proyecto para su acceso y pruebas.