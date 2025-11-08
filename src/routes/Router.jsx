import { createBrowserRouter } from "react-router-dom";
//import de las direcciones
import Login from '../components/Login';
import Articles from '../components/Articles';
import ArticleDetail from "../components/ArticleDetails";
import ArticleForm from "../components/ArticleForm";
import Profile from "../components/Profile";
import UpdateProfileForm from "../components/UpdateProfileForm";
import Comentarios from "../components/Comentarios";
import EliminarArt from "../components/EliminarArticulo";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import AgregarComentario from "../components/AgregarComentario";
import EliminarComentario from "../components/EliminarComentario";
import Presentation from "../components/Presentation";


const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element:

                    <Presentation />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "articles",
                element: (
                    <ProtectedRoute>
                        <Articles />
                    </ProtectedRoute>
                ),
            },
            
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },

            {
                path: "articles/:id",
                element: (
                    <ProtectedRoute>
                        <ArticleDetail />
                    </ProtectedRoute>)
            },
            {
                path: "create",
                element: (
                    <ProtectedRoute>
                        <ArticleForm />
                    </ProtectedRoute>
                ) 
            },

            {
                path: "updateprofile",
                element: (
                    <ProtectedRoute>
                        <UpdateProfileForm />
                    </ProtectedRoute>
                ),
            },

            {
                path: "comments/articles/:{id}/",
                element: (
                    <ProtectedRoute>
                        <Comentarios />
                    </ProtectedRoute>
                ),
            },

            {
                path: "infosphere/comments/:{id}/",
                element: (
                    <ProtectedRoute>
                        <AgregarComentario />
                    </ProtectedRoute>
                ),
            },

            {
                path: "/infosphere/articles/:{id}/",
                element: (
                    <ProtectedRoute>
                        <EliminarArt />
                    </ProtectedRoute>
                ),
            },

            {
                path: "/infosphere/comments/:{id}/",
                element: (
                    <ProtectedRoute>
                        <EliminarComentario />
                    </ProtectedRoute>
                ),
            },

        ],
    },
    {
        path: "*",
        element: <h1>Not found</h1>
    },
]);

export { Router };
