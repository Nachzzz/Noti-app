import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import './Home.css'

const Home = () => {
    const [page, setPage] = useState(1); // Estado para la página actual
    const [articles, setArticles] = useState([]); // Estado para los artículos cargados
    const [searchQuery, setSearchQuery] = useState(""); // Estado para la consulta de búsqueda
    const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

    const { data, isLoading, isError } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/articles?page=${page}&title=${searchTerm}`, {
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'HvuEjtfDJSNLRDq4fLdLk9zmNZGCtWIGb1W3b6q2iABexBDvLyv4rINRtQBPzg3q',
        },
    });

    useEffect(() => {
        if (data && data.results) {
            setArticles(prevArticles => (page === 1 ? data.results : [...prevArticles, ...data.results]));
        }
    }, [data, page]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value); // Actualizar el estado del término de búsqueda
    };

    const handleSearch = () => {
        setPage(1); // Reiniciar la página a 1 para nuevas búsquedas
        setArticles([]); // Limpiar artículos anteriores
        setSearchTerm(searchQuery); // Actualizar el término de búsqueda
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1); // Incrementar la página
    };

    const dateExist = (date) => { //Comprueba si la fecha de publicacion existe
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime()) ? "Sin especificar" : parsedDate.toLocaleDateString();
    }

    if (isLoading && page === 1) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div className="not-found-art">Error: No hay mas noticias disponibles</div>;
    }

    return (
        <div className="articles-data-container">
            <div className="logo"><img src="/ikm.png" alt="" /></div>
            <h1>Home:</h1>
            <div className="aestetic-container">
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
                <h2>Noticias del dia</h2>
                {articles.length > 0 ? (
                    <div>
                        {articles.map((article) => (
                            <div key={article.id} className="article-card-home">
                                <h2 className="title">{article.title}</h2>
                                <h4 className="abstract">{article.abstract}</h4>
                                <p>{article.content}</p>
                                {article.image && <img src={article.image} alt="No" className="article-image" />}
                                <div className="article-footer">
                                    {/* <p><strong>Author:</strong> {article.author}</p> */}
                                    <p><strong>Views:</strong> {article.view_count}</p>
                                    <p className="date"><strong> Fecha de publicacion: </strong>{dateExist(article.created_at)}</p>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleLoadMore} className="load-more-button">
                            Cargar más
                        </button>
                    </div>
                ) : (
                    <p>No hay artículos disponibles.</p>
                )}

            </div>
        </div>
    );
};

export default Home;
