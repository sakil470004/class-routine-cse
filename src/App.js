import { useEffect, useState } from 'react';
import './App.css';
import RAppBar from './Pages/AppBar/RAppBar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { getStoredCart } from './Pages/FakeDB/FakeDB';


function App() {
  const [batchNumber, setBatchNumber] = useState('')

  useEffect(() => {
    const currentUser = getStoredCart().user;
    setBatchNumber(currentUser);
  }, [])
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          {!batchNumber && < Route path="/" element={<Login setBatchNumber={setBatchNumber} />}>
          </Route>}
          <Route path="/Home"
            element={
              <>
                <RAppBar batchNumber={batchNumber} setBatchNumber={setBatchNumber} />
                <Home batchNumber={batchNumber} setBatchNumber={setBatchNumber} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>


    </div >
  );
}

export default App;
