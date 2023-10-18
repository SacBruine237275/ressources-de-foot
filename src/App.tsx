import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './screens/Home';
import { Routes, Route } from 'react-router-dom';
import { Club } from './screens/Club';
import { Joueur } from './screens/Joueur';

function App() {
  return (
    <div>
      <header className='flex items-center'>
          <img className='w-20' src='images/logo.png' alt='logo du site Ressource de foot' loading='lazy' />
          <h1 className=''>Ressource de foot</h1>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Club/:id' element={<Club />} />
        <Route path='/Joueur/:id' element={<Joueur />} />
      </Routes>
    </div>
  );
}

export default App;
