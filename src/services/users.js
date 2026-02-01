import api from "../api/axios.js";

export async function createUser(payload) {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("last_name", payload.last_name);
    formData.append("username", payload.username);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("phone", payload.phone);
    formData.append("rol", payload.rol);
    if (payload.user_img) {
        formData.append("user_img", payload.user_img);
    }
    formData.append("cod_agencia", payload.cod_agencia);


    const response = await api.post("/user/store", formData);

    return response.data.user;
}

export async function updateUser(id, payload) {
    const body = {
        name: payload.name,
        last_name: payload.last_name,
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
        rol: payload.rol,
        cod_agencia: payload.cod_agencia || null,
    };

    if (payload.password && payload.password.trim() !== "") {
        body.password = payload.password;
    }

    const response = await api.put(`/user/update/${id}`, body);
    return response.data.user;
}

export async function updatePass(userId, password, password_confirmation) {
    const response = await api.put(`/user/updatepass/${userId}`, {
        password,
        password_confirmation,
    });
    return response.data;
}

export async function deactivateUser(id) {
    try {
        const response = await api.put(`/user/desactivar/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deactivating user:", error.response || error);
        throw error;
    }
}

export async function activateUser(id) {
    try {
        const response = await api.put(`/user/activar/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error activating user:", error.response || error);
        throw error;
    }
}

// export async function updateUserImg(userId, file) {
//   const fd = new FormData();
//   fd.append("user_img", file);

//   const response = await api.post(`/user/updateimg/${userId}`, fd);
//   return response.data.user;
// }

export async function fetchUsers(status = "active", name = "") {
    try {
        let url;
        if (status === "inactive") {
            url = name ? `/user/inactivos/search/${encodeURIComponent(name)}` : "/user/inactivos";
        } else {
            url = name ? `/user/search/${encodeURIComponent(name)}` : "/user";
        }

        const response = await api.get(url);
        return response.data.users || [];
    } catch (error) {
        console.error("Error fetching users:", error.response || error);
        throw error;
    }
}

