import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import NavBar from '../NavBar'


const index = () => {
  return (
    <React.StrictMode>
      <Router>
        <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profil" element={<Profil />} />
            <Route exact path="/trending" element={<Trending />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </Routes>
      </Router>
    </React.StrictMode>
      
  )
}

export default index
