import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navigation from './Pages/Nav Bar/Navigation';

function App() {


  return (
    <div className="App">
      {/* <Home /> */}
      <Navigation />
      <Login />
    </div>
  );
}

export default App;
