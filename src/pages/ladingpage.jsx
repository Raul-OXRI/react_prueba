import React from "react";
import imagenagencias from "../assets/NUESTRAS-AGENCIAS.png"
import imageniconos from "../assets/ICONOS-AGENTES.png"
import imagenlogo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };
    return (
        <div>
            {/* NAVBAR */}
            <div className="navbar bg-white shadow-sm mb-10 px-4 h-25">
                <div className="navbar-start">
                    <a className="btn btn-xl btn-ghost px-5 hover:bg-white border-none shadow-none">
                        <img
                            src={imagenlogo}
                            alt="Logo"
                            className="h-6 sm:h-8 md:h-12 lg:h-16 w-auto"
                        />
                    </a>
                </div>
                <div className="navbar-end">
                    <button
                        onClick={handleLoginClick}
                        className="
                            btn 
                            btn-success 
                            btn-outline
                            btn-sm sm:btn-md
                            px-6
                            rounded-full
                            font-semibold
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:shadow-lg
                            active:scale-95
                        "
                    >
                        Iniciar sesión
                    </button>
                </div>

            </div>

            {/* IMAGEN PRINCIPAL */}
            <div className="flex justify-center items-center w-full px-4 mb-10">
                <img
                    src={imagenagencias}
                    alt="Nuestras Agencias"
                    className="
                      w-full
                      max-w-[200px]
                      sm:max-w-xs
                      md:max-w-sm
                      lg:max-w-xl
                      h-auto
                    "
                />
            </div>

            {/* ICONOS */}
            <div className="flex justify-center mb-12 px-4">
                <img
                    src={imageniconos}
                    alt="Iconos Agentes"
                    className="
                      w-full
                      max-w-md
                      sm:max-w-xl
                      md:max-w-3xl
                      lg:max-w-7xl
                      h-auto
                    "
                />
            </div>

            {/* filtro para buscar agencia  */}
            <div className="mb-20 px-4">
                <div className="flex justify-center md:justify-start">
                    <label
                        className="
                          input input-bordered
                          w-full
                          max-w-sm
                          sm:max-w-md
                          md:max-w-lg
                          h-14
                          sm:h-16
                          flex items-center gap-3
                        "
                    >
                        <i className="fa-duotone fa-solid fa-magnifying-glass text-xl sm:text-2xl"></i>
                        <input
                            type="search"
                            required
                            placeholder="Buscar agencia por su nombre"
                            className="text-sm sm:text-base w-full"
                        />
                    </label>
                </div>
            </div>


            {/* Foreach para las tarjetas de agencias */}
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 place-items-center">

                    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md
                        shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        hover:-translate-y-2
                        group">
                        <figure className="relative overflow-hidden h-56">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                                className="w-full h-full object-cover
                                transition-transform duration-500
                                group-hover:scale-110"
                            />
                        </figure>
                        <div className="card-body bg-white">
                            <h2 className="card-title text-indigo-950 text-3xl">
                                Agencia Cobán central
                                <div className="badge badge-primary">abierto</div>
                            </h2>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-map-pin text-2xl"></i>
                                </span>
                                Dirección
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-phone text-2xl"></i>
                                </span>
                                telefono
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-duotone fa-solid fa-timer text-2xl"></i>
                                </span>
                                horario
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <a
                                    href="https://daisyui.com/components/button/"
                                    className="btn btn-success btn-circle w-20 h-20 flex items-center justify-center"
                                    target="_blank"
                                >
                                    <i className="fa-brands fa-waze text-5xl"></i>
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md
                        shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        hover:-translate-y-2
                        group">
                        <figure className="relative overflow-hidden h-56">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                                className="w-full h-full object-cover
                                transition-transform duration-500
                                group-hover:scale-110"
                            />
                        </figure>
                        <div className="card-body bg-white">
                            <h2 className="card-title text-indigo-950 text-3xl">
                                Agencia Cobán central
                                <div className="badge badge-primary">abierto</div>
                            </h2>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-map-pin text-2xl"></i>
                                </span>
                                Dirección
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-phone text-2xl"></i>
                                </span>
                                telefono
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-duotone fa-solid fa-timer text-2xl"></i>
                                </span>
                                horario
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <a
                                    href="https://daisyui.com/components/button/"
                                    className="btn btn-success btn-circle w-20 h-20 flex items-center justify-center"
                                    target="_blank">
                                    <i className="fa-brands fa-waze text-5xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md
                        shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        hover:-translate-y-2
                        group">
                        <figure className="relative overflow-hidden h-56">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                                className="w-full h-full object-cover
                                transition-transform duration-500
                                group-hover:scale-110"
                            />
                        </figure>
                        <div className="card-body bg-white">
                            <h2 className="card-title text-indigo-950 text-3xl">
                                Agencia Cobán central
                                <div className="badge badge-primary">abierto</div>
                            </h2>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-map-pin text-2xl"></i>
                                </span>
                                Dirección
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-phone text-2xl"></i>
                                </span>
                                telefono
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-duotone fa-solid fa-timer text-2xl"></i>
                                </span>
                                horario
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <a
                                    href="https://daisyui.com/components/button/"
                                    className="btn btn-success btn-circle w-20 h-20 flex items-center justify-center"
                                    target="_blank"
                                >
                                    <i className="fa-brands fa-waze text-5xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md
                        shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        hover:-translate-y-2
                        group">
                        <figure className="relative overflow-hidden h-56">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                                className="w-full h-full object-cover
                                transition-transform duration-500
                                group-hover:scale-110"
                            />
                        </figure>
                        <div className="card-body bg-white">
                            <h2 className="card-title text-indigo-950 text-3xl">
                                Agencia Cobán central
                                <div className="badge badge-primary">abierto</div>
                            </h2>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-map-pin text-2xl"></i>
                                </span>
                                Dirección
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-phone text-2xl"></i>
                                </span>
                                telefono
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-duotone fa-solid fa-timer text-2xl"></i>
                                </span>
                                horario
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <a
                                    href="https://daisyui.com/components/button/"
                                    className="btn btn-success btn-circle w-20 h-20 flex items-center justify-center"
                                    target="_blank"
                                >
                                    <i className="fa-brands fa-waze text-5xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md
                        shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        hover:-translate-y-2
                        group">
                        <figure className="relative overflow-hidden h-56">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                                className="w-full h-full object-cover
                                transition-transform duration-500
                                group-hover:scale-110"
                            />
                        </figure>
                        <div className="card-body bg-white">
                            <h2 className="card-title text-indigo-950 text-3xl">
                                Agencia Cobán central
                                <div className="badge badge-primary">abierto</div>
                            </h2>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-map-pin text-2xl"></i>
                                </span>
                                Dirección
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-phone text-2xl"></i>
                                </span>
                                telefono
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-duotone fa-solid fa-timer text-2xl"></i>
                                </span>
                                horario
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <a
                                    href="https://daisyui.com/components/button/"
                                    className="btn btn-success btn-circle w-20 h-20 flex items-center justify-center"
                                    target="_blank"
                                >
                                    <i className="fa-brands fa-waze text-5xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md
                        shadow-xl hover:shadow-2xl
                        transition-all duration-300
                        hover:-translate-y-2
                        group">
                        <figure className="relative overflow-hidden h-56">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                                className="w-full h-full object-cover
                                transition-transform duration-500
                                group-hover:scale-110"
                            />
                        </figure>
                        <div className="card-body bg-white">
                            <h2 className="card-title text-indigo-950 text-3xl">
                                Agencia Cobán central
                                <div className="badge badge-primary">abierto</div>
                            </h2>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-map-pin text-2xl"></i>
                                </span>
                                Dirección
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-solid fa-phone text-2xl"></i>
                                </span>
                                telefono
                            </p>
                            <p className="text-indigo-800 text-xl">
                                <span>
                                    <i className="fa-duotone fa-solid fa-timer text-2xl"></i>
                                </span>
                                horario
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <a
                                    href="https://daisyui.com/components/button/"
                                    className="btn btn-success btn-circle w-20 h-20 flex items-center justify-center"
                                    target="_blank"
                                >
                                    <i className="fa-brands fa-waze text-5xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    );
}