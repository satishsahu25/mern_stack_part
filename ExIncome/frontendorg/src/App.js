import React, { useEffect } from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {



  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Login/>}/>
    
  </Routes>
    </BrowserRouter>
  )
}

export default App