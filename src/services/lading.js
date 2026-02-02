import api from "../api/axios.js";

export async function fetchAgenciasLanding(search = "") {
  const q = (search ?? "").trim();

  const url = q
    ? `/agencia/search/${encodeURIComponent(q)}`
    : `/agencia`;

  const res = await api.get(url);
  return res.data?.agencias ?? [];
}
