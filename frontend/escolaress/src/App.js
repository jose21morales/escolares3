// import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.jsx';
import Nav from './components/Nav/Nav.js';
import Cart from './components/Cart/Cart.js';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/login' && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
