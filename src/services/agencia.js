import api from "../api/axios.js";



export async function createAgencia(payload) {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("serie_agencia", payload.serie_agencia);
  formData.append("codigo_agencia", payload.codigo_agencia);
  formData.append("address", payload.address);
  formData.append("phone", payload.phone);
  formData.append("cod_municipio", payload.cod_municipio);
  
  if (payload.longitud !== undefined && payload.longitud !== null && payload.longitud !== "") {
    formData.append("longitud", Number(payload.longitud).toFixed(7));
  }
  if (payload.latitud !== undefined && payload.latitud !== null && payload.latitud !== "") {
    formData.append("latitud", Number(payload.latitud).toFixed(7));
  }
  if (payload.img) {
    formData.append("img", payload.img);
  }

  const response = await api.post("/agencia/store", formData);

  return response.data.agencia;
}

export async function updateAgencia(id, payload) {
    const body = {
        name: payload.name ?? null,
        serie_agencia: payload.serie_agencia ?? null,
        codigo_agencia: payload.codigo_agencia ?? null,
        address: payload.address ?? null,
        phone: payload.phone ?? null,
        longitud: payload.longitud ?? null,
        latitud: payload.latitud ?? null,
        cod_municipio: payload.cod_municipio ?? null,
    };

    const response = await api.put(`/agencia/update/${id}`, body);
    return response.data.agencia;
}

export async function deactivateAgencia(id) {
    const response = await api.put(`/agencia/desactivar/${id}`);
    return response.data.agencia;
}

export async function activateAgencia(id) {
    const response = await api.put(`/agencia/activar/${id}`);
    return response.data.agencia;
}

// -----------------------------

export async function fetchAgencias(search = "") {
  let url = "/agencia";
  if (search && search.trim() !== "") {
    url = `/agencia/search/${encodeURIComponent(search.trim())}`;
  }
  const res = await api.get(url);
  const data = res.data;
  return data.agencias ?? data ?? [];
}



export async function fetchAgenciasInactivas() {
    try {
        const response = await api.get("/agencia/inactivos");
        return response.data.agencias || [];
    } catch (error) {
        console.error("Error fetching agencias inactivas:", error.response || error);
        throw error;
    }
}


export async function fetchAgencia(id) {
    try {
        const response = await api.get(`/agencia/show/${id}`);
        return response.data.agencia;
    } catch (error) {
        console.error("Error fetching agencia:", error.response || error);
        throw error;
    }
}


export async function fetchAgenciaDetalle(id) {
    try {
        const response = await api.get(`/agencia/showagencia/${id}`);
        return response.data.agencia;
    } catch (error) {
        console.error("Error fetching agencia detalle:", error.response || error);
        throw error;
    }
}

export async function fetchAgenciasby(status = "active", search = "") {
    try {
        let url;

        if (status === "inactive") {
            url = search
                ? `/agencia/inactivos/search/${encodeURIComponent(search.trim())}`
                : "/agencia/inactivos";
        } else {
            url = search
                ? `/agencia/search/${encodeURIComponent(search.trim())}`
                : "/agencia";
        }

        const res = await api.get(url);
        return res.data.agencias ?? [];
    } catch (error) {
        console.error("Error fetching agencias:", error.response || error);
        throw error;
    }
}


