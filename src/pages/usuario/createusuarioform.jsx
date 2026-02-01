import React, { useState } from "react";

export default function CreateUsuarioForm({
    formData,
    handleChangeForm,
    handleFileChange,
    agencias = [], // lista de agencias
    agenciaFilter = "",
    onAgenciaFilterChange,
    onAgenciaSelect,
    isEdit = false,
}) {
    const [showAgenciaSuggestions, setShowAgenciaSuggestions] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordsMatch = formData.password === confirmPassword;

    const handleAgenciaInputChange = (e) => {
        onAgenciaFilterChange(e.target.value);
        setShowAgenciaSuggestions(true);
    };

    const handleSelectAgencia = (a) => {
        onAgenciaSelect(a);
        setShowAgenciaSuggestions(false);
    };

    const handleAgenciaBlur = () => {
        setTimeout(() => setShowAgenciaSuggestions(false), 150);
    };

    return (
        <div className="space-y-6">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-user"></i>
                            Nombre <span className="text-error">*</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full rounded-xl"
                        value={formData.name}
                        onChange={handleChangeForm}
                        required
                        placeholder="Ingrese el nombre"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-user-tag"></i>
                            Apellido <span className="text-error">*</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        className="input input-bordered w-full rounded-xl"
                        value={formData.last_name}
                        onChange={handleChangeForm}
                        required
                        placeholder="Ingrese el apellido"
                    />
                </div>
            </div>

            {/* Email y Usuario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-envelope"></i>
                            Correo electrónico <span className="text-error">*</span>
                        </span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full rounded-xl"
                        value={formData.email}
                        onChange={handleChangeForm}
                        required
                        placeholder="usuario@ejemplo.com"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-user-circle"></i>
                            Usuario <span className="text-error">*</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="input input-bordered w-full rounded-xl"
                        value={formData.username}
                        onChange={handleChangeForm}
                        required
                        placeholder="nombre_usuario"
                    />
                </div>
            </div>

            {/* Teléfono y Contraseña */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-phone"></i>
                            Teléfono
                        </span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        className="input input-bordered w-full rounded-xl"
                        value={formData.phone}
                        onChange={handleChangeForm}
                        placeholder="+502 00000000"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-lock"></i>
                            Contraseña {isEdit ? "" : <span className="text-error">*</span>}
                        </span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="input input-bordered w-full rounded-xl"
                        value={formData.password}
                        onChange={handleChangeForm}
                        placeholder="••••••••"
                        required={!isEdit}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-lock-check"></i>
                            Confirmar contraseña {isEdit ? "" : <span className="text-error">*</span>}
                        </span>
                    </label>
                    <input
                        type="password"
                        className={`input input-bordered w-full rounded-xl ${confirmPassword.length > 0 && !passwordsMatch ? "input-error" : ""
                            }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required={!isEdit}
                    />
                    {!passwordsMatch && confirmPassword.length > 0 && (
                        <span className="label-text-alt text-error text-xs mt-1">
                            Las contraseñas no coinciden.
                        </span>
                    )}
                </div>
            </div>

            {/* Agencia y Rol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-building"></i>
                            Agencia <span className="text-error">*</span>
                        </span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full rounded-xl"
                        placeholder="Escriba para buscar..."
                        value={agenciaFilter}
                        onChange={handleAgenciaInputChange}
                        onBlur={handleAgenciaBlur}
                        required
                    />
                    {showAgenciaSuggestions && agencias.length > 0 && (
                        <div className="absolute left-0 right-0 bg-base-100 border rounded-xl shadow-lg mt-1 max-h-48 overflow-auto z-20">
                            {agencias.map((a) => (
                                <button
                                    key={a.id}
                                    type="button"
                                    onClick={() => handleSelectAgencia(a)}
                                    className="w-full px-4 py-2 text-left hover:bg-base-200"
                                >
                                    {a.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                            <i className="fa-solid fa-shield-halved"></i>
                            Rol
                        </span>
                    </label>

                    <select
                        name="rol"
                        className="select select-bordered w-full rounded-xl"
                        value={formData.rol}
                        onChange={handleChangeForm}
                        required
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="consulta">Consulta</option>
                    </select>
                </div>
            </div>

            {/* Imagen */}
            {/* <div className="form-control mt-4">
                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        name="user_img"
                        accept="image/*"
                        className="file-input file-input-bordered w-full rounded-xl"
                        onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                </div>
                <span className="label-text-alt text-gray-400 mt-1 text-xs">
                    Formato recomendado: JPG / PNG — Máximo 5MB
                </span>
            </div> */}
        </div>
    );
}
