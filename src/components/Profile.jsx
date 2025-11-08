import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import './Profile.css';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const { token } = useAuth("state");
    const { logout } = useAuth("actions");
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${apiBaseUrl}users/profiles/profile_data`, {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Falló al hacer fetch del usuario");
            }
            return response.json();
        })
        .then((data) => {
            console.log('User data received:', data); // Debug
            setUserData(data);
        })
        .catch((error) => {
            console.error('Error fetching profile:', error);
            setIsError(error.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [token, apiBaseUrl]);

    function formatDate(dateString) {
        if (!dateString) {
            return 'Fecha no disponible';
        }
        
        try {
            const date = new Date(dateString);
            
            // Verificar si la fecha es válida
            if (isNaN(date.getTime())) {
                return 'Fecha inválida';
            }
            
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            };
            return new Intl.DateTimeFormat('es-ES', options).format(date);
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Error en fecha';
        }
    }

    function formatDateForInput(dateString) {
        if (!dateString) return '';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            
            return date.toISOString().split('T')[0];
        } catch (error) {
            return '';
        }
    }

    if (isLoading) {
        return <div>Cargando perfil...</div>;
    }

    if (isError) {
        return <div>Error: {isError}</div>;
    }

    return(
        <div>
            {userData ? (
                <div className="container">
                    <h2 className="title is-2">Datos de usuario</h2>
                    <form className="formul">
                        <h2 className="subtitle is-3">Bienvenido <span className="title is-3">{userData.first_name || userData.user?.first_name || 'Usuario'}</span></h2>
                        
                        {userData.image && (
                            <div className="profile-image">
                                <img
                                    src={`http://localhost:5000${userData.image}`}
                                    alt="Imagen de perfil"
                                    className="profile-img"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        
                        <label>Usuario: </label>
                        <input 
                            type="text"
                            className="input is-info is-rounded" 
                            readOnly
                            disabled={true}
                            value={userData.username || userData.user?.username || ''}
                         />
                         <br />
                         
                        <label>Nombre: </label>
                        <input 
                            type="text"
                            className="input is-info is-rounded" 
                            readOnly
                            disabled={true}
                            value={userData.first_name || userData.user?.first_name || ''}
                         />
                         <br />
                         
                        <label>Apellido: </label>
                        <input 
                            type="text"
                            className="input is-info is-rounded" 
                            readOnly
                            disabled={true}
                            value={userData.last_name || userData.user?.last_name || ''}
                         />
                         <br />
                         
                        <label>Email: </label>
                        <input 
                            type="email"
                            className="input is-info is-rounded" 
                            readOnly
                            disabled={true}
                            value={userData.email || userData.user?.email || ''}
                         />
                         <br />
                         
                        <label>Fecha de nacimiento: </label>
                        <input 
                            type="date"
                            className="input is-info is-rounded" 
                            readOnly
                            disabled={true}
                            value={formatDateForInput(userData.dob)}
                         />
                         
                         <p className="bio">
                            Mi Biografia:
                            <br />
                            <br />
                            <span className="bioSpan">
                                {userData.bio || "Biografia no disponible"}
                            </span>    
                         </p>
                         
                        <p className="bio"> 
                            Creado el: {formatDate(userData.createdAt || userData.created_at)}
                        </p>
                        <p className="bio"> 
                            Última actualización: {formatDate(userData.updatedAt || userData.updated_at)}
                        </p>
                    </form>
                    
                    <br />
                    <div className="columns">
                        <a className="inicio" href="/">Ir a Inicio</a>
                        <a className="editar" href="/updateprofile">Editar Perfil</a>
                        <button className="buttonLogout" onClick={() => logout()}>Cerrar sesión</button>
                    </div>
                </div>
            ) : (
                <p>No se encontraron datos del usuario</p>
            )}
        </div>
    );
}

export default Profile;