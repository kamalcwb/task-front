import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Usuarios from './paginas/Usuarios/Usuarios';
import Login from './paginas/Login/Login';
import Tarefas from './paginas/Tarefas/Tarefas';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Usuarios />} />
        <Route path='/tarefas/:id' element={<Tarefas />} />
      </Routes>
    </>
  );
}
export default App;
