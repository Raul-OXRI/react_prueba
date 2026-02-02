import api from "../api/axios.js";

export async function fetchMunicipios(search = "") {
  let url = "/municipio"; 
  if (search && search.trim() !== "") {
    url = `/municipio/search/${encodeURIComponent(search.trim())}`;
  }
  const res = await api.get(url);
  const data = res.data;
  return data.municipios ?? data;
}