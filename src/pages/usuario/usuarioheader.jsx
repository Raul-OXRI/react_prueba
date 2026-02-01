import React from "react";

export default function UsuarioHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-person text-3xl text-white"></i>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white sm:text-3xl">
                        Gestión de usuarios
                    </h1>
                    <p className="text-xs text-white sm:text-sm">
                        Administración de usuarios
                    </p>
                </div>
            </div>
        </div>
    );
}