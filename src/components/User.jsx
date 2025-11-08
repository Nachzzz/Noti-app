import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function User({ id, showFullName = true }) {
    const { isAuthenticated, token } = useAuth("state");
    const [user, setUser] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const [iserror, setIsError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data`,{
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error("Falló al hacer fetch del usuario");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setIsError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    },[])

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Fetching user data...");
        }
    }, [id, isAuthenticated]);

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user]);

    if (isloading) return <p>Loading...</p>;
    if (iserror) return <p>Usuario eliminado</p>;

    return (
        <div>
            {user ? (
                <p>
                    {showFullName ? (
                        `${user.first_name} ${user.last_name}`
                    ) : (
                        user.first_name
                    )}
                </p>
            ) : (
                <p>Usuario eliminado</p>
            )}
        </div>
    );
}
