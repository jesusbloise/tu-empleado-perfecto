-- init.sql

-- Creación de la tabla empresa
CREATE TABLE IF NOT EXISTS api_empresa (
    id BIGINT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    rut VARCHAR(20) UNIQUE NOT NULL
);

-- Creación de la tabla empleado
CREATE TABLE IF NOT EXISTS api_empleado (
    id BIGINT PRIMARY KEY,
    empresa_id BIGINT REFERENCES api_empresa(id) ON DELETE SET NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    rut VARCHAR(20) UNIQUE NOT NULL
);
