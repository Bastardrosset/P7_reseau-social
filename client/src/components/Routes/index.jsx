import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import NavBar from '../NavBar'


const index = () => {
  return (
    <React.StrictMode>
      <Router>
        <NavBar />
          <Routes>
            <Route exact='true' path="/" element={<Home />} />
            <Route exact='true' path="/profil" element={<Profil />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </Routes>
      </Router>
    </React.StrictMode>
      
  )
}

export default index
