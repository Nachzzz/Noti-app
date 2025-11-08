import React from 'react';
import { Link } from 'react-router-dom';
import './Presentation.css';

const Presentation = () => {
    return (
        <div className="legendary-presentation-container">
            <div className="legendary-overlay"></div>
            <div className="legendary-presentation-content">
                <h1 className="legendary-presentation-title">Noti-App</h1>
                <p className="legendary-presentation-description">
                    Tu fuente confiable de noticias serias. Con una interfaz diseñada para ofrecerte la mejor experiencia, te proporcionamos información precisa y relevante para una audiencia exigente.
                </p>
                <div className="serious-news-highlight">
                    <h2 className="highlight-text">Noticias serias para gente seria</h2>
                </div>
                <h2 className="legendary-presentation-objectives-title">🎯 Objetivos</h2>
                <p className="legendary-presentation-objectives">
                    Nuestra misión es brindarte noticias basadas en datos confiables, utilizando la tecnología de ReactJS para asegurar un acceso fácil y rápido a la información más relevante del momento.
                </p>
                <Link to="/articles" className="navigate-to-articles">
                    <div className="arrow-container">
                        <span className="arrow-text">A las noticias</span>
                        <span className="arrow-icon">→</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Presentation;
