import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import "./Profile.css";

function UpdateProfileForm() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Cambiado a true inicialmente
    const [isError, setIsError] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    // CORREGIR: usar useAuth correctamente
    const { token, user__id } = useAuth(); // Sin "state" como parámetro
    
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);
    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        // Verificar que tenemos user__id antes de hacer la petición
        if (!user__id || !token) {
            setIsLoading(false);
            return;
        }

        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles?user__id=${user__id}`, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
            // REMOVER credentials: "include" o configurar el servidor CORS apropiadamente
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Falló al hacer fetch del usuario");
            }
            return response.json();
        })
        .then((data) => {
            setUserData(data);
            // Inicializar los estados con los datos del usuario
            if (data) {
                setUsername(data.username || "");
                setFirstName(data.first_name || "");
                setLastName(data.last_name || "");
                setEmail(data.email || "");
                setDob(data.dob || "");
                setBio(data.bio || "");
            }
        })
        .catch((error) => {
            setIsError(error.message);
            console.error("Error fetching user data:", error);
        })
        .finally(() => {
            setIsLoading(false);
        });

        // Configurar fecha máxima
        const today = new Date();
        const minAge = 18;
        const maxDate = new Date(
            today.getFullYear() - minAge,
            today.getMonth(),
            today.getDate()
        ).toISOString().split("T")[0];
        setMaxDate(maxDate);
    }, [user__id, token]); // Agregar dependencias

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);

        if (!token) {
            Swal.fire({
                title: "Error",
                text: "Debe iniciar sesión para actualizar su perfil.",
                icon: "error",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            });
            setError("Debe iniciar sesión para actualizar su perfil.");
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("dob", dob);
        formData.append("bio", bio);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(
                `https://sandbox.academiadevelopers.com/users/profiles/${user__id}/`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Token ${token}`,
                        // No establecer Content-Type para FormData, el navegador lo hará automáticamente
                    },
                    body: formData,
                    // REMOVER credentials: "include"
                }
            );

            if (response.ok) {
                setSuccess(true);
                Swal.fire({
                    title: "Éxito",
                    text: "Perfil actualizado con éxito.",
                    icon: "success",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then(() => {
                    window.location.href = "/profile";
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    title: "Error",
                    text: errorData.message || "Error al actualizar el perfil.",
                    icon: "error",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                });
                setError(errorData.message || "Error al actualizar el perfil.");
            }
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: "Error de red al actualizar el perfil. Por favor, intente nuevamente.",
                icon: "error",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            });
            setError("Error de red al actualizar el perfil.");
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Mostrar loading
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    // Mostrar error
    if (isError) {
        return <div>Error: {isError}</div>;
    }

    return (
        <div>
            {userData ? (
                <div className="container">
                    <h2 className="title is-2">Editar Perfil</h2>
                    <div>
                        <form onSubmit={handleSubmit} className="formul">
                            <label>
                                Usuario: <br />
                                <input 
                                    className="input is-info is-rounded"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Nombre: <br />
                                <input 
                                    className="input is-info is-rounded"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Apellido: <br />
                                <input
                                    className="input is-info is-rounded" 
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Email: <br />
                                <input 
                                    className="input is-info is-rounded"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Fecha de Nacimiento: <br />
                                <input
                                    className="input is-info is-rounded" 
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    max={maxDate}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Biografia: <br />
                                <textarea
                                    className="textarea is-info"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    maxLength={1000}
                                    rows={4}
                                />
                            </label>
                            <br />
                            <label>
                                Imagen de perfil: <br />
                                <input 
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </label>
                            <br />
                            <button className="btnActualizar" type="submit">
                                Editar Perfil
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>No se encontraron datos</p>
            )}
        </div>
    );
}

export default UpdateProfileForm;