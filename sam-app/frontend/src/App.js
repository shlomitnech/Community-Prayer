import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./Components/NavBar";
import Home from './Pages/Home';
import SubmitName from './Pages/SubmitName';
import Subscribe from './Pages/Subscribe';
import MyNames from './Pages/MyNames';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submitname" element={<SubmitName />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/myNames" element={<MyNames />} />
      </Routes>
    </Router>
  );
}

export default App;
