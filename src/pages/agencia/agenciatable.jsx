import React from "react";
import Alert from "../components/alert.jsx";

export default function AgenciaTable({
  agencias,
  loading,
  error,
  onEdit,
  onDeactivate,
  onActivate,
  statusTab,
  onImage,
}) {
  const hasAgencias = Array.isArray(agencias) && agencias.length > 0;

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
      <div className="overflow-x-auto">
        {loading && (
          <div className="text-center py-10 text-sm text-gray-500">
            Cargando agencias...
          </div>
        )}

        {error && !loading && <Alert message={error} />}

        {!loading && !error && hasAgencias && (
          <table className="table table-zebra">
            <thead className="bg-base-200/60">
              <tr>
                <th>Nombre</th>
                <th>Serie</th>
                <th>Código</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Municipio</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {agencias.map((agencia) => {
                return (
                  <tr key={agencia.id}>
                    <td className="font-medium">{agencia?.name ?? "—"}</td>
                    <td>{agencia?.serie_agencia ?? "—"}</td>
                    <td>{agencia?.codigo_agencia ?? "—"}</td>
                    <td>{agencia?.phone ?? "—"}</td>
                    <td className="max-w-xs truncate" title={agencia?.address ?? ""}>
                      {agencia?.address ?? "—"}
                    </td>
                    <td>{agencia?.municipio?.name ?? "—"}</td>

                    <td className="text-center">
                      {statusTab === "active" && (
                        <div className="flex justify-center gap-2">
                          <button 
                            className="btn btn-ghost btn-lg tooltip"
                            data-tip="Editar imagen"
                            onClick={() => onImage && onImage(agencia)}
                          >
                            <i className="fa-duotone fa-solid fa-file-image text-xl text-neutral"></i>
                          </button>

                          <button
                            className="btn btn-ghost btn-lg tooltip"
                            data-tip="Editar agencia"
                            onClick={() => onEdit && onEdit(agencia)}
                          >
                            <i className="fa-regular fa-pen-to-square text-xl text-neutral"></i>
                          </button>

                          <button
                            className="btn btn-ghost btn-lg tooltip"
                            data-tip="Desactivar agencia"
                            onClick={() => onDeactivate(agencia.id)}
                          >
                            <i className="fa-solid fa-ban text-xl text-neutral"></i>
                          </button>
                        </div>
                      )}

                      {statusTab === "inactive" && (
                        <button
                          className="btn btn-ghost btn-lg tooltip"
                          data-tip="Activar agencia"
                          onClick={() => onActivate(agencia.id)}
                        >
                          <i className="fa-solid fa-circle-check text-xl text-neutral"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!loading && !error && !hasAgencias && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-sm text-gray-500">
              Intenta ajustar el término de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
