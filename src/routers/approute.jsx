import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/ladingpage";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard.jsx";
import Usuario from "../pages/usuario/usuario.jsx";
import PrivateLayout from "./privatelayout.jsx";

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                    <PrivateLayout>
                        <Dashboard />
                    </PrivateLayout>
                } />
                <Route path="/usuario" element={
                    <PrivateLayout>
                        <Usuario />
                    </PrivateLayout>
                } />


            </Routes>
        </BrowserRouter>
    );
}