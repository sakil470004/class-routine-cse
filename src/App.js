import { useEffect, useState } from 'react';
import './App.css';
import RAppBar from './Pages/AppBar/RAppBar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';


function App() {


  return (
    <div className="App">

      <RAppBar />
      <Home />
      {/* <Login /> */}
    </div>
  );
}

export default App;
