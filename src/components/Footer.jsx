import React from 'react';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleEmailClick = () => {
    window.location.href = 'mailto:contacto@notiapp.com';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='footer'>
      <div className="footer-container">
        {/* Sección principal */}
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              </svg>
              <span className="brand-name">NotiApp</span>
            </div>
            <p className="footer-tagline">
              Tu fuente confiable de noticias y artículos actualizados
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-links">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/articles">Artículos</a></li>
              <li><a href="/">Acerca de</a></li>
              <li><a href="/">Contacto</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-contact">
            <h4>Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="mailto:nachosalto17@gmail.com" onClick={handleEmailClick}>
                  Contactarse
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="footer-divider"></div>

        {/* Sección inferior */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {currentYear} <strong>NotiApp</strong>. Todos los derechos reservados.
            </p>
            <p className="creators">
              Creado con ❤️ por <a href="#">Flores Luciano</a> & 
              <a href='https://www.linkedin.com/in/jorge-ignacio-salto-0b29221bb'> Salto Ignacio</a>
            </p>
          </div>

          {/* Botón volver arriba */}
          <button className="back-to-top" onClick={scrollToTop} aria-label="Volver al inicio">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}