import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from '../views/SplashScreen';
import Register from '../views/Register'
import List from '../views/List'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
