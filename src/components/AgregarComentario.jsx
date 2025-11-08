import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import './AgregarComentario.css';

const AgregarComentario = ({ onCommentAdded }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const state = useAuth("state");
    let token = state.token;
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${apiBaseUrl}infosphere/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                // QUITAR: credentials: 'include',
                // QUITAR: X-CSRFToken
                body: JSON.stringify({ content, article: id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al enviar el comentario');
            }

            const newComment = await response.json();
            setContent(''); // Limpia el campo de texto
            window.location.reload(); // Recarga para mostrar el nuevo comentario
        } catch (err) {
            console.error('Error adding comment:', err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-comment-container">
            <h2 className="comment-title">Agregar un comentario</h2>
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                    rows="4"
                    required
                    className="comment-textarea"
                ></textarea>
                <button type="submit" className="comment-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            {error && <p className="comment-error">{error}</p>}
        </div>
    );
};

export default AgregarComentario;
