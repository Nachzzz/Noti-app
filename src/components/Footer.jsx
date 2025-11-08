import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className="content has-text-centered">
        <p>
          <strong>NotiApp</strong> hecho por <a>Flores Luciano</a> & <a>Salto Ignacio.</a>
        </p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
