import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import './App.css';
import Watchlist from './components/Watchlist';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
