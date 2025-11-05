import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Home from './pages/Home';
import About from './pages/About';
import '../index.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);

export default App;
