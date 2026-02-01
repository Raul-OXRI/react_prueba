import React, { useState } from "react";

export default function UpdateUsuarioForm({
  formData,
  handleChangeForm,
  handleFileChange,
  agencias = [],
}) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMatch = formData.password === confirmPassword;

  return (
    <div className="space-y-8">
      <div>
        {/* Nombres y Apellidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <i className="fa-solid fa-user"></i>
                Nombre
              </span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full rounded-xl"
              value={formData.name}
              onChange={handleChangeForm}
              placeholder="Ingrese el nombre"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <i className="fa-solid fa-user-tag"></i>
                Apellido
              </span>
            </label>
            <input
              type="text"
              name="last_name"
              className="input input-bordered w-full rounded-xl"
              value={formData.last_name}
              onChange={handleChangeForm}
              placeholder="Ingrese el apellido"
            />
          </div>
        </div>

        {/* Correo, Usuario, Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <i className="fa-solid fa-envelope"></i>
                Correo electrónico
              </span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full rounded-xl"
              value={formData.email}
              onChange={handleChangeForm}
              placeholder="usuario@ejemplo.com"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <i className="fa-solid fa-user-circle"></i>
                Usuario
              </span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full rounded-xl"
              value={formData.username}
              onChange={handleChangeForm}
              placeholder="nombre_usuario"
            />
          </div>
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
        </div>

        {/* Contraseña */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <i className="fa-solid fa-lock"></i>
                Contraseña
              </span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full rounded-xl"
              value={formData.password}
              onChange={handleChangeForm}
              placeholder="••••••••"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center gap-2">
                <i className="fa-solid fa-lock-check"></i>
                Confirmar contraseña
              </span>
            </label>
            <input
              type="password"
              className={`input input-bordered w-full rounded-xl ${
                confirmPassword.length > 0 && !passwordsMatch
                  ? "input-error"
                  : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
            {!passwordsMatch && confirmPassword.length > 0 && (
              <span className="label-text-alt text-error text-xs mt-1">
                Las contraseñas no coinciden.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Agencia y Rol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium flex items-center gap-2">
              <i className="fa-solid fa-building"></i>
              Agencia
            </span>
          </label>
          <select
            name="cod_agencia"
            className="select select-bordered w-full rounded-xl"
            value={formData.cod_agencia}
            onChange={handleChangeForm}
          >
            <option value="">Seleccione una agencia</option>
            {agencias.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
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
          >
            <option value="">Seleccione un rol</option>
            <option value="admin">Administrador</option>
            <option value="consulta">Consulta</option>
          </select>
        </div>
      </div>
    </div>
  );
}
