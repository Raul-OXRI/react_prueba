import React from "react";
import imagenLogin from "../assets/fotologin_2.jpeg"
import { loginRequest } from "../services/authservice.js";
import { useNavigate } from "react-router-dom";
import Alert from "./components/alert.jsx";

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
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
            <div className="w-full max-w-7xl max-h-[650px] bg-neutral rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden h-56 md:h-auto">
                    <img
                        src={imagenLogin}
                        alt="imagen de login"
                        className="w-full h-64 md:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent flex items-end p-8">
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
                                <span className="label-text text-white mb-2">
                                    <i className="fa-duotone fa-solid fa-user-tie text-2xl"></i>
                                    Usuario
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="tu_usuario"
                                className="input input-primary w-full rounded-xl"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white mb-2">
                                    <i className="fa-duotone fa-regular fa-lock text-2xl"></i>
                                    Contraseña
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="input input-primary w-full rounded-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm text-gray"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    title={showPassword ? "Ocultar" : "Mostrar"}
                                >
                                    <i className={showPassword ? "fa-solid fa-eye text-md" : "fa-solid fa-eye-low-vision text-md"} />
                                </button>
                            </div>

                        </div>

                        {error && <Alert message={error} />}

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={handleLoginClick}
                                    className="btn bg-secondary text-white w-full rounded-xl border-none hover:bg-gray-700 transition-all duration-300"
                                >
                                    <i class="fa-duotone fa-solid fa-arrow-left text-xl"></i>
                                    Regresar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                    btn bg-primary text-white w-full rounded-xl border-2 border-primary hover:bg-cyan-800 transition-all duration-300"
                                >
                                    {loading ? "Ingresando..." : "Iniciar Sesión"}
                                    <i className="fa-duotone fa-solid fa-arrow-right text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}