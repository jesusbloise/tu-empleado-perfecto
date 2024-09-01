import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">¡Tu Empleado Perfecto!</h1>
        <h2 className="home-subtitle">¡Startup! RRHH</h2>
        <div className="home-buttons">
          <Link to="/Empresas" className="home-button">
            Mis Empresas
          </Link>
          <Link to="/Empleados" className="home-button">
            Mis Empleados
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
