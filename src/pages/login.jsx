import React from "react";
import imagenLogin from "../assets/fotologin.jpg"
import { loginRequest } from "../services/authservice.js";
import { useNavigate } from "react-router-dom";
import Alert from "./components/alert.jsx";

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/");
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await loginRequest(username, password);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            // Mensaje del backend: "Credenciales incorrectas" o "Tu cuenta está inactiva..."
            const msg = err.response?.data?.message || "Error al iniciar sesión";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-7xl bg-neutral rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden">
                    <img
                        src={imagenLogin}
                        alt="imagen de login"
                        className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lime-900/80 via-lime-900/40 to-transparent flex items-end p-8">
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-2">Bienvenido</h2>
                            <p className="text-indigo-100 opacity-90">
                                Inicia sesión para continuar con tu cuenta
                            </p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center mb-20">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2 text-white">
                            Iniciar Sesión
                        </h1>
                        <p className="text-white">Ingresa tus credenciales para acceder</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white mb-2">Usuario</span>
                            </label>
                            <input
                                type="text"
                                placeholder="tu_usuario"
                                className="input input-success w-full rounded-xl"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white mb-2">Contraseña</span>
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input input-success w-full rounded-xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <Alert message={error} />}


                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn bg-success text-black w-full rounded-xl border-none hover:bg-lime-600 transition-all duration-300"
                            >
                                {loading ? "Ingresando..." : "Iniciar Sesión"}
                            </button>

                            <button
                                onClick={handleLoginClick}
                                className="btn bg-secondary text-black w-full rounded-xl border-none hover:bg-gray-600 transition-all duration-300"
                            >
                                Regresar
                            </button>
                        </div>



                    </form>
                </div>
            </div>
        </div>

    );
}