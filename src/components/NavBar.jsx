import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "./NavBar.css"

const NavBar = () => {
    const state = useAuth('state');
    const actions = useAuth('actions');
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutFeedback, setShowLogoutFeedback] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        actions.logout();
        setIsMenuOpen(false);
        
        // Mostrar feedback de logout exitoso
        setShowLogoutFeedback(true);
        setTimeout(() => {
            setShowLogoutFeedback(false);
        }, 3000);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Notificación de feedback */}
            {showLogoutFeedback && (
                <div className="feedback-notification success">
                    <div className="feedback-content">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Sesión cerrada exitosamente</span>
                    </div>
                    <button 
                        className="feedback-close"
                        onClick={() => setShowLogoutFeedback(false)}
                    >
                        ×
                    </button>
                </div>
            )}

            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            </svg>
                            <span>NotiApp</span>
                        </Link>
                        
                        {/* Indicador de estado de sesión */}
                        <div className="session-status">
                            {state?.isAuthenticated ? (
                                <div className="status-indicator online">
                                    <div className="status-dot"></div>
                                    <span>Conectado</span>
                                </div>
                            ) : (
                                <div className="status-indicator offline">
                                    <div className="status-dot"></div>
                                    <span>Sin sesión</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <button 
                        className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                        <div className="navbar-nav">
                            <Link to="/" className="navbar-item" onClick={handleMenuClick}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Inicio</span>
                            </Link>
                            
                            <Link to="/articles" className="navbar-item" onClick={handleMenuClick}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Artículos</span>
                            </Link>
                            
                            {/* Mostrar "Publicar" y "Perfil" solo si está autenticado */}
                            {state?.isAuthenticated && (
                                <>
                                    <Link to="/create" className="navbar-item" onClick={handleMenuClick}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Publicar</span>
                                    </Link>
                                    
                                    <Link to="/profile" className="navbar-item" onClick={handleMenuClick}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Perfil</span>
                                    </Link>
                                </>
                            )}
                            
                            {/* Mostrar "Iniciar Sesión" o "Cerrar Sesión" según el estado de autenticación */}
                            {!state?.isAuthenticated ? (
                                <Link to="/login" className="navbar-item login-btn" onClick={handleMenuClick}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Iniciar Sesión</span>
                                </Link>
                            ) : (
                                <button onClick={handleLogout} className="navbar-item logout-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Cerrar Sesión</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;