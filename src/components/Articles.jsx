import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import './Articles.css';

const Articles = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Usa la variable de entorno para la URL base
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const { data, isLoading, isError } = useFetch(
        `${apiBaseUrl}infosphere/articles?page=${page}&title=${searchTerm}`
    );

    useEffect(() => {
        if (data) {
            // La nueva API devuelve los artículos directamente en data.results
            // o directamente en data si es un array
            if (data.results) {
                setArticles(prevArticles => (page === 1 ? data.results : [...prevArticles, ...data.results]));
            } else if (Array.isArray(data)) {
                setArticles(prevArticles => (page === 1 ? data : [...prevArticles, ...data]));
            }
        }
    }, [data, page]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        setPage(1);
        setArticles([]);
        setSearchTerm(searchQuery);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (isLoading && page === 1) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div className="not-found-art">Error: No se pudo obtener los datos</div>;
    }

    return (
        <div className="articles-data-container">
            <h1 className="art">Artículos:</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyPress}
                    className="search-bar"
                    value={searchQuery}
                />
                <button onClick={handleSearch} className="search-button">
                    Buscar
                </button>
            </div>
            <div className="articles-grid">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div
                            key={`${article._id || article.id}-${index}`}
                            className="article-card"
                            onClick={() => navigate(`/articles/${article._id || article.id}`)}
                        >
                            <h2 className="title">{article.title}</h2>
                            <h4 className="abstract">{article.abstract}</h4>
                            {article.image && (
                                <img 
                                    src={`http://localhost:5000${article.image}`} 
                                    alt={article.title} 
                                    className="article-image" 
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}
                            <div className="article-meta">
                                <p><strong>Autor:</strong> {article.author?.username || 'Anónimo'}</p>
                                <p><strong>Vistas:</strong> {article.view_count || 0}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay artículos disponibles.</p>
                )}
            </div>
            {data && data.next && (
                <button onClick={handleLoadMore} className="load-more-button">
                    Cargar más
                </button>
            )}
        </div>
    );
};

export default Articles;
