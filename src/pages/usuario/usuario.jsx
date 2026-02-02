import React, { useEffect } from "react";
// Servicios
import {
  fetchUsers,
  createUser,
  updateUser,
  deactivateUser,
  activateUser,
} from "../../services/users.js";
import { fetchAgencias } from "../../services/agencia.js";
// Componentes
import UsuarioHeader from "./usuarioheader.jsx";
import UsuarioSearch from "./usuariosearch.jsx";
import UsuarioTable from "./usuariotable.jsx";
import ModalCreate from "../components/modalcreate.jsx";
import CreateUsuarioForm from "./createusuarioform.jsx";
import UpdateUsuarioForm from "./updateusuaioform.jsx";

// Datos iniciales del formulario
const initialFormData = {
  name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  rol: "",
  cod_agencia: "",
};

export default function Usuario() {
  // Estados de usuario
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [statusTab, setStatusTab] = React.useState("active");
  //modales
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [editingUserId, setEditingUserId] = React.useState(null);
  //formulario
  const [formData, setFormData] = React.useState(initialFormData);
  const [userFile, setUserFile] = React.useState(null);
  //estaod de agencias
  const [agencias, setAgencias] = React.useState([]);
  const [agenciaFilter, setAgenciaFilter] = React.useState("");
  const [agenciaLoading, setAgenciaLoading] = React.useState(false);
  // Cargar usuarios
  const loadUsers = async (term = "", status = statusTab) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchUsers(status, term);
      setUsers(data);
    } catch {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios al montar el componente y al cambiar la pestaña o búsqueda
  useEffect(() => { loadUsers(search, statusTab); }, [statusTab, search]);

  // Cargar agencias activas (y buscar por nombre)
  const loadAgencias = async (term = "") => {
    try {
      setAgenciaLoading(true);
      const data = await fetchAgencias(term);
      setAgencias(data); // idealmente ya vienen activas desde tu endpoint /agencia
    } catch (e) {
      console.error("Error al cargar agencias:", e);
      setAgencias([]);
    } finally {
      setAgenciaLoading(false);
    }
  };

  const handleAgenciaFilterChange = (value) => {
    setAgenciaFilter(value);
    loadAgencias(value); // busca mientras escribe
  };

  const handleAgenciaSelect = (agencia) => {
    // mostrar nombre en el input
    setAgenciaFilter(agencia.name);
    // guardar ID en formData
    setFormData((prev) => ({
      ...prev,
      cod_agencia: agencia.id,
    }));
  };
  // -------

  // Manejadores de eventos
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejador para el cambio de archivo
  const handleFileChange = (file) => setUserFile(file);

  // Abrir modales
  const handleOpenCreate = () => {
    setFormData(initialFormData);
    setUserFile(null);
    setAgenciaFilter("");
    setAgencias([]);
    loadAgencias("");
    setShowCreateModal(true);
  };

  // Abrir modal de edición
  const handleOpenEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ ...initialFormData, ...user, password: "" });
    setUserFile(null);
    const agenciaNombre = user?.agencia?.name ?? "";
    setAgenciaFilter(agenciaNombre);
    loadAgencias(agenciaNombre);
    setShowUpdateModal(true);
  };

  // Cerrar modales
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowUpdateModal(false);
    setEditingUserId(null);
  };

  // Enviar formularios
  const handleSubmitCreate = async () => {
    try {
      await createUser({ ...formData, user_img: userFile });
      setShowCreateModal(false);
      await loadUsers(search, statusTab);
    } catch {
      alert("Error al crear el usuario. Revise los campos.");
    }
  };

  // Enviar formulario de actualización
  const handleSubmitUpdate = async () => {
    try {
      await updateUser(editingUserId, formData);
      setShowUpdateModal(false);
      await loadUsers(search, statusTab);
    } catch {
      alert("Error al actualizar el usuario. Revise los campos.");
    }
  };

  // Activar / Desactivar usuario
  const toggleUserStatus = async (id, action) => {
    if (!window.confirm(`¿Desea ${action === "activate" ? "activar" : "desactivar"} este usuario?`)) return;
    try {
      setLoading(true);
      const res = action === "activate" ? await activateUser(id) : await deactivateUser(id);
      alert(res.message || `Usuario ${action}ado correctamente.`);
      await loadUsers(search, statusTab);
    } catch {
      alert(`Error al ${action} el usuario.`);
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <UsuarioHeader />
      <div className="tabs tabs-boxed w-fit">
        <button
          className={`tab ${statusTab === "active" ? "tab-active" : ""}`}
          onClick={() => setStatusTab("active")}
        >
          Activos
        </button>
        <button
          className={`tab ${statusTab === "inactive" ? "tab-active" : ""}`}
          onClick={() => setStatusTab("inactive")}
        >
          Inactivos
        </button>
      </div>
      <UsuarioSearch
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onOpenCreate={handleOpenCreate}
      />
      <ModalCreate
        isOpen={showCreateModal || showUpdateModal}
        modalId={showCreateModal ? "modal-create-usuario" : "modal-update-usuario"}
        title={showCreateModal ? "Crear usuario" : "Editar usuario"}
        onSubmit={showCreateModal ? handleSubmitCreate : handleSubmitUpdate}
        onClose={handleCloseModal}
        submitLable="Guardar"
      >
        {showCreateModal ? (
          <CreateUsuarioForm
            formData={formData}
            handleChangeForm={handleFormChange}
            handleFileChange={handleFileChange}
            isEdit={false}
            agencias={agencias}
            agenciaFilter={agenciaFilter}
            onAgenciaFilterChange={handleAgenciaFilterChange}
            onAgenciaSelect={handleAgenciaSelect}
            agenciaLoading={agenciaLoading} // opcional si lo quieres mostrar
          />
        ) : (
          <UpdateUsuarioForm
            formData={formData}
            handleChangeForm={handleFormChange}
            handleFileChange={handleFileChange}
            agencias={agencias}
            agenciaFilter={agenciaFilter}
            onAgenciaFilterChange={handleAgenciaFilterChange}
            onAgenciaSelect={handleAgenciaSelect}
            agenciaLoading={agenciaLoading} // opcional
          />
        )}
      </ModalCreate>
      <UsuarioTable
        users={users}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDeactivate={(id) => toggleUserStatus(id, "deactivate")}
        onActivate={(id) => toggleUserStatus(id, "activate")}
        statusTab={statusTab}
      />
    </div>
  );
}
