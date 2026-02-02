import React from "react";

export default function AgenciaSearch({ search, onSearchChange, onOpenCreate }) {
    return (
        <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body gap-4">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <div className="flex-1 w-full lg:max-w-md">
                        <label className="input input-bordered flex items-center gap-2 rounded-xl">
                            <i className="fa-duotone fa-solid fa-magnifying-glass"></i>
                            
                            <input
                                type="text"
                                id="searchInput"
                                className="grow text-sm"
                                placeholder="Buscar por nombre de agencia..."
                                value={search}
                                onChange={onSearchChange}
                            />
                        </label>
                    </div>
                    <div className="flex gap-3 w-full lg:w-auto">
                        <button
                            className="btn rounded-xl flex-1 lg:flex-none gap-2 text-black font-medium normal-case bg-primary hover:bg-lime-500 border-0 shadow-lg"
                            type="button"
                            onClick={onOpenCreate}
                        >
                            <i className="fa-duotone fa-regular fa-building-columns"></i>
                            Nueva agencia
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}