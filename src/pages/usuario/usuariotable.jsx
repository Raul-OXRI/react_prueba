import React from "react";
import Alert from "../components/alert.jsx";

export default function UsuarioTable({ users, loading, error, onEdit, onDeactivate, onActivate, statusTab }) {
    const hasUsers = users && users.length > 0;

    return (
        <div className="card bg-base-100 shadow-sm borde-base-200 overflow-hidden">
            <div className="overflow-x-auto">
                {loading && (
                    <div className="text-center py-10 text-sm text-gray-500">
                        Cargando usuarios...
                    </div>
                )}

                {error && !loading && <Alert message={error} />}

                {!loading && !error && hasUsers && (
                    <table className="table table-zebra">
                        <thead className="bg-base-200/60">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Telefono</th>
                                <th>Correo electronico</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="font-medium">{user.name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">
                                        {statusTab === "active" && (
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-ghost btn-lg tooltip" data-tip="Editar usuario" onClick={() => onEdit && onEdit(user)}>
                                                    <i className="fa-regular fa-user-pen text-xl text-neutral"></i>
                                                </button>
                                                <button className="btn btn-ghost btn-lg tooltip" data-tip="Desactivar usuario" onClick={() => onDeactivate(user.id)}>
                                                    <i className="fa-duotone fa-user-circle-minus text-xl text-neutral"></i>
                                                </button>
                                            </div>
                                        )}
                                        {statusTab === "inactive" && (
                                            <button className="btn btn-ghost btn-lg tooltip" data-tip="Activar usuario" onClick={() => onActivate(user.id)}>
                                                <i className="fa-solid fa-user-check text-xl text-neutral"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && !error && !hasUsers && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
                            <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
                        <p className="text-sm text-gray-500">Intenta ajustar el término de búsqueda</p>
                    </div>
                )}
            </div>
        </div>
    );
}
