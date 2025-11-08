import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "./NavBar.css"

const NavBar = () => {

    const logout = useAuth('actions').logout;


    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">Inicio</Link>
                <Link to="/login" className="navbar-item">Iniciar Sesion</Link>
                <Link to="/articles" className="navbar-item">Artículos</Link>
                <Link to="/profile" className="navbar-item">Perfil</Link>
                <Link to="/create" className='navbar-item'>Publicar</Link>
                <button onClick={logout} className='navbar-item' id='salir'>Cerrar Sesión</button>

            </div>

        </nav>
    );
}

export default NavBar;