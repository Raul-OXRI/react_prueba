import React, { useEffect, useState } from "react";
import imagenagencias from "../assets/NUESTRAS-AGENCIAS.png";
import imageniconos from "../assets/ICONOS-AGENTES.png";
import imagenlogo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

import { fetchAgenciasLanding } from "../services/lading.js";

export default function LandingPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [agencias, setAgencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginClick = () => navigate("/login");

  useEffect(() => {
    let alive = true;

    const t = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchAgenciasLanding(search);
        if (!alive) return;
        setAgencias(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        setAgencias([]);
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "No se pudieron cargar las agencias"
        );
      } finally {
        if (alive) setLoading(false);
      }
    }, 350); // debounce

    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [search]);

  
  const buildWazeUrl = (lat, lng) => {
    if (!lat || !lng) return null;
    return `https://waze.com/ul?ll=${encodeURIComponent(lat)},${encodeURIComponent(
      lng
    )}&navigate=yes`;
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

      {/* filtro para buscar agencia */}
      <div className="mb-10 px-4">
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
              placeholder="Buscar agencia por su nombre"
              className="text-sm sm:text-base w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        {/* estados */}
        <div className="mt-4">
          {loading && (
            <div className="text-center md:text-left text-sm opacity-70">
              Cargando agencias...
            </div>
          )}
          {!loading && error && (
            <div className="alert alert-error mt-2">
              <span>{error}</span>
            </div>
          )}
          {!loading && !error && agencias.length === 0 && (
            <div className="text-center md:text-left text-sm opacity-70">
              No se encontraron agencias.
            </div>
          )}
        </div>
      </div>

      {/* Cards dinámicas */}
      <div className="pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 place-items-center">
          {agencias.map((a) => {
            const wazeUrl = buildWazeUrl(a.latitud, a.longitud);

            return (
              <div
                key={a.id}
                className="card bg-base-100 w-full max-w-sm sm:max-w-md
                  shadow-xl hover:shadow-2xl
                  transition-all duration-300
                  hover:-translate-y-2
                  group"
              >
                <figure className="relative overflow-hidden h-56">
                  <img
                    src={
                      a.img ||
                      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={a.name || "Agencia"}
                    className="w-full h-full object-cover
                      transition-transform duration-500
                      group-hover:scale-110"
                  />
                </figure>

                <div className="card-body bg-white">
                  <h2 className="card-title text-indigo-950 text-2xl md:text-3xl">
                    {a.name || "Agencia"}
                    <div className="badge badge-success">abierto</div>
                  </h2>

                  <p className="text-indigo-800 text-lg md:text-xl">
                    <span>
                      <i className="fa-solid fa-map-pin text-xl md:text-2xl"></i>
                    </span>{" "}
                    {a.address || "Sin dirección"}
                  </p>

                  <p className="text-indigo-800 text-lg md:text-xl">
                    <span>
                      <i className="fa-solid fa-phone text-xl md:text-2xl"></i>
                    </span>{" "}
                    {a.phone || "Sin teléfono"}
                  </p>

                  {/* Si después agregas horario, lo pones aquí */}
                  {/* <p className="text-indigo-800 text-xl">
                      <i className="fa-solid fa-clock"></i> {a.horario}
                  </p> */}

                  <div className="card-actions justify-end mt-4">
                    <a
                      href={wazeUrl || "#"}
                      className={`btn btn-success btn-circle w-20 h-20 flex items-center justify-center ${
                        !wazeUrl ? "btn-disabled" : ""
                      }`}
                      target="_blank"
                      rel="noreferrer"
                      title={wazeUrl ? "Abrir en Waze" : "Sin coordenadas"}
                      onClick={(e) => {
                        if (!wazeUrl) e.preventDefault();
                      }}
                    >
                      <i className="fa-brands fa-waze text-5xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
