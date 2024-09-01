// src/components/MisEmpleados.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import './Empleados.css'; // Importa el archivo CSS para los estilos

const Empleados = () => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre_completo: '', rut: '', email: '' });
  const [selectedEmpleados, setSelectedEmpleados] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/empresas/');
        setEmpresas(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  useEffect(() => {
    const fetchEmpleados = async () => {
      if (selectedEmpresa) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/empleados/?empresa=${selectedEmpresa}`);
          setEmpleados(response.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setEmpleados([]);
      }
    };

    fetchEmpleados();
  }, [selectedEmpresa]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/empleados/', {
        ...nuevoEmpleado,
        empresa: selectedEmpresa
      });
      setNuevoEmpleado({ nombre_completo: '', rut: '', email: '' });

      // Refrescar la lista de empleados para la empresa seleccionada
      const response = await axios.get(`http://127.0.0.1:8000/api/empleados/?empresa=${selectedEmpresa}`);
      setEmpleados(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectEmpleado = (id) => {
    setSelectedEmpleados(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all([...selectedEmpleados].map(id =>
        axios.delete(`http://127.0.0.1:8000/api/empleados/${id}/`)
      ));

      // Refrescar la lista de empleados para la empresa seleccionada
      const response = await axios.get(`http://127.0.0.1:8000/api/empleados/?empresa=${selectedEmpresa}`);
      setEmpleados(response.data);
      setSelectedEmpleados(new Set());
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="empleados-container">
      <div className="empleados-content">
        <h1 className="empleados-title">Selecciona una Empresa</h1>
        
        <div className="empleados-card">
          <select className="empleados-select" onChange={(e) => setSelectedEmpresa(e.target.value)} value={selectedEmpresa}>
            <option value="">Selecciona una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
            ))}
          </select>

          {selectedEmpresa && (
            <div className="empleados-form-container">
              <h2>{nuevoEmpleado.id ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}</h2>
              <form onSubmit={handleSubmit} className="empleados-form">
                <div className="empleados-form-group">
                  <label htmlFor="nombre_completo">Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre_completo"
                    placeholder="Nombre Completo"
                    value={nuevoEmpleado.nombre_completo}
                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre_completo: e.target.value })}
                    required
                  />
                </div>
                <div className="empleados-form-group">
                  <label htmlFor="rut">RUT</label>
                  <input
                    type="text"
                    id="rut"
                    placeholder="RUT"
                    value={nuevoEmpleado.rut}
                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, rut: e.target.value })}
                    required
                  />
                </div>
                <div className="empleados-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={nuevoEmpleado.email}
                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, email: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="empleados-button">
                  {nuevoEmpleado.id ? 'Guardar Cambios' : 'Agregar Empleado'}
                </button>
              </form>

              <h2>Empleados de la empresa</h2>
              <ul className="empleados-list">
                {empleados.map((empleado) => (
                  <li key={empleado.id} className="empleado-item">
                    <input
                      type="checkbox"
                      checked={selectedEmpleados.has(empleado.id)}
                      onChange={() => handleSelectEmpleado(empleado.id)}
                    />
                    <div>
                      <h3>{empleado.nombre_completo}</h3>
                      <p><strong>RUT:</strong> {empleado.rut}</p>
                      <p><strong>Email:</strong> {empleado.email}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {selectedEmpleados.size > 0 && (
                <button onClick={handleDeleteSelected} className="empleados-button-danger">
                  Eliminar Seleccionados
                </button>
              )}
            </div>
          )}
             <button 
          className="empleados-back-home" 
          onClick={() => navigate('/')} // Redirige a Home
        >
          Regresar a Home
        </button>
        </div>
      </div>
    </div>
  );
};

export default Empleados;
