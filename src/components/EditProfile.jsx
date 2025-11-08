import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import './Profile.css';

function EditProfile() {
    const [userData, setUserData] = useState(null);
    //const [isloading, setIsLoading] = useState(null);
    //const [iserror, setIsError] = useState(null);

    const { token, user__id } = useAuth("state");
    const { logout } = useAuth("actions");

    //const { id } = useParams(); // Obtener el ID del artículo desde la URL
    //const [article, setArticle] = useState(null);
    
    const { data, isLoading, isError } = useFetch(`https://sandbox.academiadevelopers.com/users/profiles/${user__id}`, {
        headers: {
                'accept': 'application/json',
                'X-CSRFToken': 'ytYyQ4dA95dUxkse5B3il4M0lX9MObsW5CeTHXHfcYUXxGwc5x6nbg9rYVsuQgmA',
            },
        });


        useEffect(() => {
            if (data) {
                setUserData(userData);
            }
        }, [data]);
    
        if (isLoading) {
            return <div>Cargando</div>;
        }
    
        if (isError || !user__id) {
            return <div>Error: No se pudo encontrar al usuario</div>;
        }

return(
    <div>
        {userData ? (
            <div className="container">
                <h2 className="title is-2">Datos de usuario</h2>
                <form className="formul">
                    <h2 className="subtitle is-3">Bienvenido <span className="title is-3">{userData.first_name}</span></h2>
                    <label>Usuario: </label>
                    <input 
                        type="text"
                        className="input is-info is-rounded" readOnly
                        disabled={true}
                        value={userData.username}
                     />
                     <br />
                    <label>Nombre: </label>
                    <input 
                        type="text"
                        className="input is-info is-rounded" readOnly
                        disabled={true}
                        value={userData.first_name}
                     />
                     <br />
                    <label>Apellido: </label>
                    <input 
                        type="text"
                        className="input is-info is-rounded" readOnly
                        disabled={true}
                        value={userData.last_name}
                     />
                     <br />
                    <label>Email: </label>
                    <input 
                        type="email"
                        className="input is-info is-rounded" readOnly
                        disabled={true}
                        value={userData.email}
                     />
                    <br />
                    <label>ID de usuario: </label>
                    <input 
                        type="text"
                        className="input is-info is-rounded" readOnly
                        disabled={true}
                        value={userData.user__id}
                     />

                </form>
                <p className="subtitle is-6"> {userData.bio || "Biografia no disponible"} </p>
                <div className="columns">
                    <a className="button-irInicio2" href="/">Ir a Inicio</a>
                    <button className="button-irInicio" onClick={()=>logout()}>Cerrar sesion</button>
                </div>

            </div>

        ) : (
            <p>No se encontraron datos</p>
        )}
    </div>
)

}

export default EditProfile;