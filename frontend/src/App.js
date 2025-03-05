// import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Nav from './components/Nav/Nav.jsx';
import Cart from './components/Cart/Cart.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    const checkSession = async ()=>{
      try {
        const response = await axios.get('http://localhost:5000/api/auth/session',{
        withCredentials:true
        })
        if (response.data && response.data.user) {
          setUser(response.data.user)
          console.log(response.data.user)
        } else {
          console.log('Error en la peticion')
        }
      } catch (error) {
        setUser(null)
      }
    }
    checkSession()
  }, [])

      const handleLogout = async () =>{
        await axios.post('http://localhost:5000/api/auth/logout',{},{
          withCredentials: true
        })
        setUser(null)
      }
  
  return (
    <div className="App">
      {location.pathname !== '/login' && <Nav setResults={setSearchResults} user={user} handleLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={<Home searchResults={searchResults} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
