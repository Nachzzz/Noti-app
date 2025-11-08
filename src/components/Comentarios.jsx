import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import AgregarComentario from './AgregarComentario';
import EliminarComentario from './EliminarComentario';
import './Comentarios.css';

const Comentarios = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // Elimina el X-CSRFToken y los headers adicionales
    const { data, isLoading, isError } = useFetch(`${apiBaseUrl}infosphere/comments/?article=${id}`);

    const handleDeleteSuccess = () => {
        window.location.reload();
    };

    useEffect(() => {
        console.log('Data from comments API:', data); // Debug
        if (data) {
            // La nueva API puede devolver data.results O data directamente como array
            if (data.results && Array.isArray(data.results)) {
                setComments(data.results);
            } else if (Array.isArray(data)) {
                setComments(data);
            } else {
                console.log('Unexpected data format:', data);
                setComments([]);
            }
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: No se pudo cargar los comentarios</div>;
    }

    return (
        <div className="comments-section">
            <h1 className='comentarios'>Comentarios</h1>

            <AgregarComentario />

            {comments.length > 0 ? (
                comments.map((comment) => {
                    // Usa _id para MongoDB en lugar de id
                    const commentId = comment._id || comment.id;
                    const createdAt = comment.createdAt || comment.created_at;
                    
                    return (
                        <div key={commentId} className="comment">
                            <p><strong>{comment.content}</strong></p>
                            <div className="comment-footer">
                                <p>
                                    Creado el: {new Date(createdAt).toLocaleString()}
                                </p>
                                <EliminarComentario 
                                    id={commentId} 
                                    onDeleteSuccess={handleDeleteSuccess} 
                                />
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No hay comentarios.</p>
            )}
        </div>
    );
};

export default Comentarios;