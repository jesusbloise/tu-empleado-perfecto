import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Empresas.css';

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [nuevaEmpresa, setNuevaEmpresa] = useState({
    nombre: '',
    direccion: '',
    rut: '',
    telefono: ''
  });
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/empresas/', nuevaEmpresa);
      setEmpresas([...empresas, response.data]);
      setNuevaEmpresa({ nombre: '', direccion: '', rut: '', telefono: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEliminar = async (empresa) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/empresas/${empresa.id}/`);
      setEmpresas(empresas.filter((e) => e.id !== empresa.id));
      setMostrarConfirmacion(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditar = (empresa) => {
    setNuevaEmpresa(empresa);
    setEmpresaSeleccionada(empresa);
    // Desplazar al principio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmacionEliminar = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setMostrarConfirmacion(true);
  };

  const handleCancelarEliminacion = () => {
    setEmpresaSeleccionada(null);
    setMostrarConfirmacion(false);
  };

  const handleGuardarCambios = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/empresas/${empresaSeleccionada.id}/`, nuevaEmpresa);
      setEmpresas(empresas.map((e) => (e.id === empresaSeleccionada.id ? response.data : e)));
      setNuevaEmpresa({ nombre: '', direccion: '', rut: '', telefono: '' });
      setEmpresaSeleccionada(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="empresas-container">
      <div className="empresas-content">
        <h1 className="empresas-title">Mis Empresas</h1>
        
        <div className="empresas-card">
          <h2>{empresaSeleccionada ? 'Editar Empresa' : 'Crear Nueva Empresa'}</h2>
          <form onSubmit={empresaSeleccionada ? handleGuardarCambios : handleSubmit}>
            <div className="empresas-form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nuevaEmpresa.nombre}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, nombre: e.target.value })}
                required
              />
            </div>
            <div className="empresas-form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                value={nuevaEmpresa.direccion}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, direccion: e.target.value })}
                required
              />
            </div>
            <div className="empresas-form-group">
              <label htmlFor="rut">RUT</label>
              <input
                type="text"
                id="rut"
                value={nuevaEmpresa.rut}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, rut: e.target.value })}
                required
              />
            </div>
            <div className="empresas-form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                value={nuevaEmpresa.telefono}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, telefono: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="empresas-button">{empresaSeleccionada ? 'Guardar Cambios' : 'Agregar Empresa'}</button>
            {empresaSeleccionada && (
              <button type="button" className="empresas-button empresas-button-secondary" onClick={() => setEmpresaSeleccionada(null)}>
                Cancelar
              </button>
            )}
          </form>
        </div>

        <div className="empresas-list-card">
          <h2>Lista de Empresas</h2>
          <ul className="empresas-list">
            {empresas.map((empresa) => (
              <li key={empresa.id} className="empresas-list-item">
                <div>
                  <h3>{empresa.nombre}</h3>
                  <p><strong>Dirección:</strong> {empresa.direccion}</p>
                  <p><strong>RUT:</strong> {empresa.rut}</p>
                  <p><strong>Teléfono:</strong> {empresa.telefono}</p>
                </div>
                <div className="empresas-buttons">
                  <button className="empresas-button-warning" onClick={() => handleEditar(empresa)}>Editar</button>
                  <button className="empresas-button-danger" onClick={() => handleConfirmacionEliminar(empresa)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {mostrarConfirmacion && (
          <div className="modal-container">
            <div className="modal-content">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <p>Cuidado, al eliminar esta empresa se eliminarán los empleados que hay en ella. Asegúrese de que esté haciendo lo correcto.</p>
              <div className="modal-buttons">
                <button className="empresas-button empresas-button-secondary" onClick={handleCancelarEliminacion}>Cancelar</button>
                <button className="empresas-button-danger" onClick={() => handleEliminar(empresaSeleccionada)}>Eliminar</button>
              </div>
            </div>
          </div>
        )}
        
        <Link to="/" className="empresas-button empresas-back-home">
          Regresar al Home
        </Link>
      </div>
    </div>
  );
};

export default Empresas;
