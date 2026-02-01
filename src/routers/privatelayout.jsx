import React, { useEffect, useState } from "react";
import { href, useNavigate } from "react-router-dom";

import Layout from "../pages/components/layout.jsx";
import { logoutRequest } from "../services//authservice.js";

export default function PrivateLayout({ children }) {

    const navigate = useNavigate();
    // Estado del user
    const [user, setUser] = useState(null);

    // Definimos las secciones del layout
    const sections = [
        {
            title: "Administración",
            items: [
                
                { label: "Agencias", href: "/#", icon: "fa-regular fa-building-columns" },
                { label: "Usuarios", href: "/#", icon: "fa-solid fa-users" },
            ],
        }

    ];

    // Comprobar si estamos logueados
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        // Si no hay token o user, redirigimos al login
        if (!token || !userData) {
            // Si no hay login, lo mandamos a /
            navigate("/", { replace: true });
            return;
        }

        try {
            const parsed = JSON.parse(userData);
            setUser(parsed);
        } catch (e) {
            console.error("Error al parsear user de localStorage", e);
            navigate("/", { replace: true });
        }
    }, [navigate]);

    // Función de logout

    async function handleLogout() {
        try {
            await logoutRequest();
        } catch (err) {
            console.error("Error en logout", err);
        } finally {
            navigate("/", { replace: true });
        }
    }

    // Mientras cargamos el user (un mini loader)
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Cargando...
            </div>
        );
    }

    // Renderizamos el layout con las secciones y el user
    return (
        <Layout user={user} sections={sections} onLogout={handleLogout}>
            {children}
        </Layout>
    );
}