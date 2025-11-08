import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './ArticleDetails.css';
import Comentarios from './Comentarios';
import EliminarArticulo from './EliminarArticulo';
import DOMPurify from 'dompurify';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const { data: articleData, isLoading, isError } = useFetch(
        `${apiBaseUrl}infosphere/articles/${id}`
    );

    const handleDeleteSuccess = () => {
        // Redirigir a la lista de artículos después de eliminar
        window.location.href = '/articles';
    };

    useEffect(() => {
        if (articleData) {
            setArticle(articleData);
        }
    }, [articleData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !article) {
        return <div>Error: No se pudo cargar el artículo</div>;
    }

    const sanitizedContent = DOMPurify.sanitize(article.content);

    return (
        <>
            <div className="article-detail">
                <h1>{article.title}</h1>
                {article.abstract && <h4>{article.abstract}</h4>}
                <p className="article-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                {article.image && <img src={`http://localhost:5000${article.image}`} alt={article.title} />}
                <div className="article-footer">
                    <p><strong>Visitas: </strong> {article.view_count}</p>
                    {/* Asegurarnos de pasar el ID correcto */}
                    <EliminarArticulo 
                        id={article._id || article.id} 
                        onDeleteSuccess={handleDeleteSuccess} 
                    />
                </div>
            </div>
            <div>
                <Comentarios articleData={id}/>
            </div>
        </>
    );
};

export default ArticleDetail;