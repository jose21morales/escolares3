import logo from '../../img/logo.png';
import SearchBar from '../SearchBar/SearchBar.jsx';
import style from './Nav.module.css';
import { NavLink, Link } from 'react-router-dom';

export default function Nav({ user, handleLogout, setResults }) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <a className="navbar-brand" href="/">
                    <img src={logo} alt="" width="100" />
                </a>
            
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className={({isActive}) => (isActive ? 'active' : 'disable')}>
                                <Link to='/'>
                                    <button className='nav-link'>Inicio</button>
                                </Link>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                        <NavLink className={(isActive) => (isActive ? 'active' : 'disable')}>
                                {!user ? (
                                <Link to="/login">
                                    <button className='nav-link'>Iniciar sesion</button>
                                </Link>
                                ) : (
                                    <Link to="/">
                                        <button className='nav-link' onClick={handleLogout}>Cerrar sesión</button>
                                    </Link>
                            )}
                        </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className={(isActive) => (isActive ? 'active' : 'disable')}>
                                <Link to='/register'>
                                    <button className='nav-link'>Register</button>
                                </Link>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className={(isActive) => (isActive ? 'active' : 'disable')}>
                                <Link to='/cart'>
                                    <button className='nav-link'>Carrito (0)</button>
                                </Link>
                            </NavLink>
                        </li>
                    </ul>
                    <SearchBar setResults={setResults} />
                </div>
            </div>
        </nav>
    );
};