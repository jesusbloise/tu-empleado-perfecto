

// src/components/MisEmpresas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    <div className="container">
      <h1>Mis Empresas</h1>
      
      <div className="card mb-4">
        <div className="card-header">
          <h2>{empresaSeleccionada ? 'Editar Empresa' : 'Crear Nueva Empresa'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={empresaSeleccionada ? handleGuardarCambios : handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nuevaEmpresa.nombre}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, nombre: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                value={nuevaEmpresa.direccion}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, direccion: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rut" className="form-label">RUT</label>
              <input
                type="text"
                className="form-control"
                id="rut"
                value={nuevaEmpresa.rut}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, rut: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                value={nuevaEmpresa.telefono}
                onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, telefono: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">{empresaSeleccionada ? 'Guardar Cambios' : 'Agregar Empresa'}</button>
            {empresaSeleccionada && (
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setEmpresaSeleccionada(null)}>
                Cancelar
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Lista de Empresas</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {empresas.map((empresa) => (
              <li key={empresa.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h3>{empresa.nombre}</h3>
                  <p><strong>Dirección:</strong> {empresa.direccion}</p>
                  <p><strong>RUT:</strong> {empresa.rut}</p>
                  <p><strong>Teléfono:</strong> {empresa.telefono}</p>
                </div>
                <div>
                  <button className="btn btn-warning me-2" onClick={() => handleEditar(empresa)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleConfirmacionEliminar(empresa)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {mostrarConfirmacion && (
        <div className="modal d-block" tabindex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button type="button" className="btn-close" onClick={handleCancelarEliminacion}></button>
              </div>
              <div className="modal-body">
                <p>Cuidado, al eliminar esta empresa se eliminarán los empleados que hay en ella. Asegúrese de que esté haciendo lo correcto.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelarEliminacion}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={() => handleEliminar(empresaSeleccionada)}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empresas;


// // // // src/components/MisEmpresas.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const Empresas = () => {
// // //   const [empresas, setEmpresas] = useState([]);
// // //   const [nuevaEmpresa, setNuevaEmpresa] = useState({
// // //     nombre: '',
// // //     direccion: '',
// // //     rut: '',
// // //     telefono: ''
// // //   });
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchEmpresas = async () => {
// // //       try {
// // //         const response = await axios.get('http://127.0.0.1:8000/api/empresas/');
// // //         setEmpresas(response.data);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchEmpresas();
// // //   }, []);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await axios.post('http://127.0.0.1:8000/api/empresas/', nuevaEmpresa);
// // //       setEmpresas([...empresas, response.data]);
// // //       setNuevaEmpresa({ nombre: '', direccion: '', rut: '', telefono: '' });
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   if (loading) return <p>Loading...</p>;

// // //   return (
// // //     <div className="container">
// // //       <h1>Mis Empresas</h1>
      
// // //       <div className="card mb-4">
// // //         <div className="card-header">
// // //           <h2>Crear Nueva Empresa</h2>
// // //         </div>
// // //         <div className="card-body">
// // //           <form onSubmit={handleSubmit}>
// // //             <div className="mb-3">
// // //               <label htmlFor="nombre" className="form-label">Nombre</label>
// // //               <input
// // //                 type="text"
// // //                 className="form-control"
// // //                 id="nombre"
// // //                 value={nuevaEmpresa.nombre}
// // //                 onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, nombre: e.target.value })}
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-3">
// // //               <label htmlFor="direccion" className="form-label">Dirección</label>
// // //               <input
// // //                 type="text"
// // //                 className="form-control"
// // //                 id="direccion"
// // //                 value={nuevaEmpresa.direccion}
// // //                 onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, direccion: e.target.value })}
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-3">
// // //               <label htmlFor="rut" className="form-label">RUT</label>
// // //               <input
// // //                 type="text"
// // //                 className="form-control"
// // //                 id="rut"
// // //                 value={nuevaEmpresa.rut}
// // //                 onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, rut: e.target.value })}
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-3">
// // //               <label htmlFor="telefono" className="form-label">Teléfono</label>
// // //               <input
// // //                 type="text"
// // //                 className="form-control"
// // //                 id="telefono"
// // //                 value={nuevaEmpresa.telefono}
// // //                 onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, telefono: e.target.value })}
// // //                 required
// // //               />
// // //             </div>
// // //             <button type="submit" className="btn btn-primary">Agregar Empresa</button>
// // //           </form>
// // //         </div>
// // //       </div>

// // //       <div className="card">
// // //         <div className="card-header">
// // //           <h2>Lista de Empresas</h2>
// // //         </div>
// // //         <div className="card-body">
// // //           <ul className="list-group">
// // //             {empresas.map((empresa) => (
// // //               <li key={empresa.id} className="list-group-item">
// // //                 <h3>{empresa.nombre}</h3>
// // //                 <p><strong>Dirección:</strong> {empresa.direccion}</p>
// // //                 <p><strong>RUT:</strong> {empresa.rut}</p>
// // //                 <p><strong>Teléfono:</strong> {empresa.telefono}</p>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Empresas;
