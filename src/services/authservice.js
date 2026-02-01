import api from "../api/axios.js";

export async function loginRequest(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });
  console.log(response.data);
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
}

export async function logoutRequest() {
  await api.post("/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
