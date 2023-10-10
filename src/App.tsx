import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './screens/Home';
import { Routes, Route } from 'react-router-dom';
import { Club } from './screens/Club';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Club/:id' element={<Club />} />
      </Routes>
    </div>
  );
}

export default App;
