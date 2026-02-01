import React, { useEffect } from "react";
// Servicios
import {
  fetchUsers,
  createUser,
  updateUser,
  deactivateUser,
  activateUser,
} from "../../services/users.js";
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
  // Estados
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [statusTab, setStatusTab] = React.useState("active");
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [editingUserId, setEditingUserId] = React.useState(null);
  const [formData, setFormData] = React.useState(initialFormData);
  const [userFile, setUserFile] = React.useState(null);

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
    setShowCreateModal(true);
  };

  // Abrir modal de edición
  const handleOpenEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ ...initialFormData, ...user, password: "" });
    setUserFile(null);
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
        <button className={`tab ${statusTab === "active" ? "tab-active" : ""}`} onClick={() => setStatusTab("active")}>Activos</button>
        <button className={`tab ${statusTab === "inactive" ? "tab-active" : ""}`} onClick={() => setStatusTab("inactive")}>Inactivos</button>
      </div>
      <UsuarioSearch search={search} onSearchChange={e => setSearch(e.target.value)} onOpenCreate={handleOpenCreate} />

      <ModalCreate
        isOpen={showCreateModal || showUpdateModal}
        modalId={showCreateModal ? "modal-create-usuario" : "modal-update-usuario"}
        title={showCreateModal ? "Crear usuario" : "Editar usuario"}
        onSubmit={showCreateModal ? handleSubmitCreate : handleSubmitUpdate}
        onClose={handleCloseModal}
        submitLable="Guardar"
      >
        {showCreateModal ? (
          <CreateUsuarioForm formData={formData} handleChangeForm={handleFormChange} handleFileChange={handleFileChange} isEdit={false} />
        ) : (
          <UpdateUsuarioForm formData={formData} handleChangeForm={handleFormChange} handleFileChange={handleFileChange} />
        )}
      </ModalCreate>

      <UsuarioTable
        users={users} loading={loading} error={error}
        onEdit={handleOpenEdit}
        onDeactivate={id => toggleUserStatus(id, "deactivate")}
        onActivate={id => toggleUserStatus(id, "activate")}
        statusTab={statusTab}
      />
    </div>
  );
}
