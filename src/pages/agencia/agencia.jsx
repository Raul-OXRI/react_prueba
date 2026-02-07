import React, { useEffect } from "react";
import {
  fetchAgenciasby,
  createAgencia,
  updateAgencia,
  deactivateAgencia,
  activateAgencia,
  updateAgenciaImg,
} from "../../services/agencia.js";
import { fetchMunicipios } from "../../services/municipio.js";

import AgenciaHeader from "./agenciaheader.jsx";
import AgenciaSearch from "./agenciasearch.jsx";
import AgenciaTable from "./agenciatable.jsx";
import ModalCreate from "../components/modalcreate.jsx";
import CreateAgenciaForm from "./createagenciaform.jsx";
import UpdateAgenciaForm from "./updateagenciaform.jsx";
import ModalUploadImage from "../components/updateImg.jsx";

// igual que Usuario: data inicial
const initialAgenciaForm = {
  name: "",
  serie_agencia: "",
  codigo_agencia: "",
  address: "",
  phone: "",
  cod_municipio: "",
  longitud: "-90.5069000",
  latitud: "14.6349000",
};

export default function Agencia() {
  // tabla
  const [agencias, setAgencias] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [statusTab, setStatusTab] = React.useState("active");

  // modales
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [editingAgenciaId, setEditingAgenciaId] = React.useState(null);
  const [showImgModal, setShowImgModal] = React.useState(false);
  const [imgAgenciaId, setImgAgenciaId] = React.useState(null);

  // formulario controlado (como Usuario)
  const [formData, setFormData] = React.useState(initialAgenciaForm);
  const [imgFile, setImgFile] = React.useState(null);

  // municipios
  const [municipios, setMunicipios] = React.useState([]);
  const [municipioLoading, setMunicipioLoading] = React.useState(false);

  // cargar tabla
  const loadAgencias = async (term = "", status = statusTab) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAgenciasby(status, term);
      setAgencias(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error loadAgencias:", e?.response || e);
      setError("No se pudieron cargar las agencias.");
      setAgencias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgencias(search, statusTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusTab, search]);

  const loadMunicipios = async (term = "") => {
    try {
      setMunicipioLoading(true);
      const data = await fetchMunicipios(term);
      setMunicipios(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error al cargar municipios:", e?.response || e);
      setMunicipios([]);
    } finally {
      setMunicipioLoading(false);
    }
  };

  // igual que Usuario: handleChange
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // para updates desde mapa (no es evento)
  const setField = (key, value) => setFormData((p) => ({ ...p, [key]: value }));

  const handleFileChange = (file) => setImgFile(file);

  // abrir crear
  const handleOpenCreate = () => {
    setFormData(initialAgenciaForm);
    setImgFile(null);
    loadMunicipios("");
    setShowCreateModal(true);
  };

  // abrir editar
  const handleOpenEdit = (agencia) => {
    setEditingAgenciaId(agencia?.id);

    setFormData({
      name: agencia?.name ?? "",
      serie_agencia: agencia?.serie_agencia ?? "",
      codigo_agencia: agencia?.codigo_agencia ?? "",
      address: agencia?.address ?? "",
      phone: agencia?.phone ?? "",
      // importante: el back valida cod_municipio
      cod_municipio:
        agencia?.cod_municipio ??
        agencia?.municipio_id ??
        agencia?.municipio?.id ??
        "",
      longitud: agencia?.longitud ?? "-90.5069000",
      latitud: agencia?.latitud ?? "14.6349000",
    });

    setImgFile(null);
    loadMunicipios("");
    setShowUpdateModal(true);
  };

  // cerrar modales
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowUpdateModal(false);
    setEditingAgenciaId(null);
  };

  // submit crear (ModalCreate lo dispara)
  const handleSubmitCreate = async () => {
    try {
      setLoading(true);

      // payload a tu service: createAgencia espera estos campos
      await createAgencia({ ...formData, img: imgFile });

      setShowCreateModal(false);
      await loadAgencias(search, statusTab);
    } catch (e) {
      console.error("Error createAgencia:", e?.response?.data || e);
      alert("Error al crear la agencia. Revise los campos.");
    } finally {
      setLoading(false);
    }
  };

  // submit update (si tu service updateAgencia lo soporta)
  const handleSubmitUpdate = async () => {
    try {
      setLoading(true);
      await updateAgencia(editingAgenciaId, { ...formData, img: imgFile });
      setShowUpdateModal(false);
      await loadAgencias(search, statusTab);
    } catch (e) {
      console.error("Error updateAgencia:", e?.response?.data || e);
      alert("Error al actualizar la agencia. Revise los campos.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAgenciaStatus = async (id, action) => {
    if (!window.confirm(`¿Desea ${action === "activate" ? "activar" : "desactivar"} esta agencia?`))
      return;

    try {
      setLoading(true);
      action === "activate" ? await activateAgencia(id) : await deactivateAgencia(id);
      await loadAgencias(search, statusTab);
    } catch (e) {
      console.error("Error toggleAgenciaStatus:", e?.response || e);
      alert(`Error al ${action} la agencia.`);
    } finally {
      setLoading(false);
    }
  };

  //abrir y cerrar modal img
  const handleOpenImgModal = (agencia) => {
    setImgAgenciaId(agencia?.id);
    setShowImgModal(true);
  };

  const handleCloseImgModal = () => {
    setShowImgModal(false);
    setImgAgenciaId(null);
  };

  // submit imagen
  const handleSubmitImg = async (formData) => {
    try {
      setLoading(true);
      await updateAgenciaImg(imgAgenciaId, formData);
      handleCloseImgModal();
      await loadAgencias(search, statusTab);

    } catch (e) {
      console.error("Error updateAgenciaImg:", e?.response || e);
      alert("Error al actualizar la imagen de la agencia.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="space-y-6">
      <AgenciaHeader />

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

      <AgenciaSearch
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onOpenCreate={handleOpenCreate}
      />

      <ModalCreate
        isOpen={showCreateModal || showUpdateModal}
        modalId={showCreateModal ? "modal-create-agencia" : "modal-update-agencia"}
        title={showCreateModal ? "Crear agencia" : "Editar agencia"}
        onSubmit={showCreateModal ? handleSubmitCreate : handleSubmitUpdate}
        onClose={handleCloseModal}
        submitLabel="Guardar"
      >
        {showCreateModal ? (
          <CreateAgenciaForm
            formData={formData}
            handleChangeForm={handleFormChange}
            setField={setField}
            handleFileChange={handleFileChange}
            municipios={municipios}
            loadingMunicipios={municipioLoading}
          />
        ) : (
          <UpdateAgenciaForm
            formData={formData}
            handleChangeForm={handleFormChange}
            setField={setField}
            handleFileChange={handleFileChange}
            municipios={municipios}
            loadingMunicipios={municipioLoading}
          />
        )}
      </ModalCreate>

      <ModalUploadImage
        isOpen={showImgModal}
        modalId="modal-upload-img-agencia"
        title="Actualizar imagen de agencia"
        fieldName="img"
        onSubmit={handleSubmitImg}
        onClose={handleCloseImgModal}
      />


      <AgenciaTable
        agencias={agencias}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onImage={handleOpenImgModal}
        onDeactivate={(id) => toggleAgenciaStatus(id, "deactivate")}
        onActivate={(id) => toggleAgenciaStatus(id, "activate")}
        statusTab={statusTab}
      />
    </div>
  );
}
