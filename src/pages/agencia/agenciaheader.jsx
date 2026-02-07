import React from "react";

export default function AgenciaHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fa-sharp fa-regular fa-piggy-bank text-3xl text-white"></i>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-black sm:text-3xl">
                        Gestión de agencias
                    </h1>
                    <p className="text-xs text-black sm:text-sm">
                        Administración de agencias
                    </p>
                </div>
            </div>
        </div>
    );
}