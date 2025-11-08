import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import './Login.css'
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    login(responseData.token);
                    //implementacion del hook navigate para redireccionar a la pagina home
                    navigate("/")
                })
                .catch((error) => {
                    console.error("Error error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <div className="conteiner">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="text"
                            id="username"
                            name="username"
                            ref={usernameRef}
                        />
                    </div>

                    <label htmlFor="password">Contraseña:</label>
                    <div>
                        <input
                            className="input"
                            type="password"
                            id="password"
                            name="password"
                            ref={passwordRef}
                        />
                    </div>

                    <div>
                        <button type="submit">
                            Enviar
                        </button>
                        {isLoading && <p className="loading-message">Cargando...</p>}
                        {isError && <p className="error-message">Error al cargar los datos.</p>}
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Login;
