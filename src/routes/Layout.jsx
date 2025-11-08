
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";
import {Footer} from '../components/Footer';
import "./Layout.css"


export default function Layout() {
    return (
        <AuthProvider>
            <div>
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        </AuthProvider>
    );
}