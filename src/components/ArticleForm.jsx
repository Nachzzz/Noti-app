import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ArticleForm.css";

export default function ArticleForm() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [articleData, setArticleData] = useState({ title: "", content: "", abstract: "" });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const state = useAuth("state");
    let token = state.token;
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}infosphere/categories`);
            if (!response.ok) {
                throw new Error("Error al cargar las categorías");
            }
            const data = await response.json();
            console.log('Categories data:', data);
            
            if (data.results && Array.isArray(data.results)) {
                setCategories(data.results);
            } else if (Array.isArray(data)) {
                setCategories(data);
            } else {
                console.error('Formato inesperado de categorías:', data);
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
            setError("Error al cargar las categorías");
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        setLoadingCategories(true);
        fetchCategories();
    }, []);

    const handleInputChange = (event) => {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    };

    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const updatedSelectedCategories = categories.filter((cat) =>
            selectedOptions.includes(String(cat._id || cat.id))
        );
        setSelectedCategories(updatedSelectedCategories);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (!submitting && !loadingCategories) {
            setSubmitting(true);

            try {
                // Crear una instancia de FormData
                const formData = new FormData();
                formData.append('title', articleData.title);
                formData.append('content', articleData.content);
                formData.append('abstract', articleData.abstract);

                // Agregar categorías seleccionadas
                selectedCategories.forEach((category) => {
                    formData.append('categories', category._id || category.id);
                });

                // Agregar la imagen si es que se seleccionó una
                if (imageFile) {
                    formData.append('image', imageFile);
                }

                console.log('Sending article data...');
                const response = await fetch(`${apiBaseUrl}infosphere/articles/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        // NO incluir 'Content-Type' cuando usas FormData
                        // El navegador lo establecerá automáticamente con el boundary correcto
                    },
                    body: formData,
                });

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    // Intentar leer el error como texto primero
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    
                    let errorMessage = `Error ${response.status}: ${response.statusText}`;
                    
                    // Intentar parsear como JSON si es posible
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.message || errorMessage;
                    } catch {
                        // Si no es JSON, usar el texto como está
                        if (errorText.includes('<!DOCTYPE')) {
                            errorMessage = 'Error interno del servidor. Por favor, intenta más tarde.';
                        } else {
                            errorMessage = errorText || errorMessage;
                        }
                    }
                    
                    throw new Error(errorMessage);
                }

                const article = await response.json();
                console.log('Article created successfully:', article);

                // Redirigir al artículo creado
                navigate(`/articles/${article._id || article.id}`);

            } catch (error) {
                console.error("Error creating article:", error);
                setError(error.message);
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <div className="conteiner-form">
            <h2>Crear Nuevo Artículo</h2>
            
            {error && (
                <div className="error-message">
                    <strong>Error:</strong> {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="label">Título *</label>
                    <div>
                        <input
                            className="input"
                            type="text"
                            name="title"
                            value={articleData.title}
                            onChange={handleInputChange}
                            required
                            minLength="5"
                        />
                    </div>
                </div>
                
                <div>
                    <label className="label">Copete *</label>
                    <div>
                        <textarea
                            className="textarea-abstract"
                            name="abstract"
                            value={articleData.abstract}
                            onChange={handleInputChange}
                            required
                            placeholder="Resumen del artículo..."
                            minLength="10"
                        />
                    </div>
                </div>
                
                <div>
                    <label className="label">Contenido *</label>
                    <div>
                        <textarea
                            className="textarea"
                            name="content"
                            value={articleData.content}
                            onChange={handleInputChange}
                            required
                            placeholder="Contenido completo del artículo..."
                            rows="6"
                            minLength="50"
                        />
                    </div>
                </div>
                
                <div>
                    <label className="label">Imagen</label>
                    <div>
                        <input
                            className="input"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>
                </div>
                
                <div>
                    <label className="label">Categorías</label>
                    <div className="conteiner-categories">
                        {loadingCategories ? (
                            <p>Cargando categorías...</p>
                        ) : (
                            <select
                                multiple
                                size="5"
                                value={selectedCategories.map((cat) => cat._id || cat.id)}
                                onChange={handleCategoryChange}
                            >
                                {categories.map((category) => (
                                    <option 
                                        key={category._id || category.id} 
                                        value={category._id || category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <p className="help-text">
                        Mantén presionada la tecla Ctrl (Cmd en Mac) para seleccionar múltiples categorías
                    </p>
                </div>
                
                <div>
                    <button
                        className="create-button"
                        type="submit"
                        disabled={submitting || loadingCategories}
                    >
                        {submitting ? 'Creando...' : 'Crear Artículo'}
                    </button>
                </div>
            </form>
        </div>
    );
}