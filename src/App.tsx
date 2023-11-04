import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './screens/Home';
import { Routes, Route, Link } from 'react-router-dom';
import { Club } from './screens/Club';
import { Joueur } from './screens/Joueur';

function App() {
  return (
    <div>
      <header className='flex items-center mt-6'>
        <Link to={'/'}  style={{ display: 'flex', alignItems: 'center' }}>
          <img className='w-20' src='/images/logo.png' alt='logo du site Ressource de foot' loading='lazy' />
          <h1 className='text-xl font-semibold'>Ressource de foot</h1>
          </Link>
      </header>
      <div className="container mx-auto border-t border-gray-400 m-4"></div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Club/:id' element={<Club />} />
        <Route path='/Joueur/:id' element={<Joueur />} />
      </Routes>
    </div>
  );
}

export default App;
