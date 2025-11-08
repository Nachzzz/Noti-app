import { useState, useEffect } from "react";

const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async (url = 'https://sandbox.academiadevelopers.com/infosphere/categories/') => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                const data = await response.json();
                setCategories(prev => [...prev, ...data.results]);

                if (data.next) {
                    fetchCategories(data.next); // Llamada recursiva para manejar la paginación
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};


const CategoryList = () => {
    const { categories, loading, error } = useFetchCategories();

    console.log(categories);

    if (loading) return <p>Cargando categorías...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul style={{ padding: '50px' }}>
            {categories.map((category) => (
                <li key={category.id}>{category.name}</li>
            ))}
        </ul>
    );
};

export { CategoryList, useFetchCategories };
