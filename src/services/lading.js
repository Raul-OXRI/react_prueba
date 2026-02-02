import api from "../api/axios.js";

export async function fetchAgenciasLanding(search = "") {
  const q = (search ?? "").trim();

  const url = q
    ? `/ladin/search/${encodeURIComponent(q)}`
    : `/ladin`;

  const res = await api.get(url);
  return res.data?.agencias ?? [];
}
