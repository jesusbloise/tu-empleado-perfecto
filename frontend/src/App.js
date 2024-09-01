
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Empresas from './components/Empresas';
import Empleados from './components/Empleados';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/empleados" element={<Empleados />} />
      </Routes>
    </Router>
  );
};

export default App;
