import React from "react";
import { updatePass, updateUserImg } from "../../services/users";
import Alert from "../components/alert.jsx"

const Layout = ({ children, sections = [], onLogout, user: propUser }) => {
    const [user, setUser] = React.useState(propUser || (() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    }));


    const [openUserMenu, setOpenUserMenu] = React.useState(false);
    const [imgError, setImgError] = React.useState(false);

    // modal subir imagen
    const [openImgModal, setOpenImgModal] = React.useState(false);
    const [selectedImg, setSelectedImg] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState("");

    // modal cambiar contraseña
    const [openPassModal, setOpenPassModal] = React.useState(false);
    const [pass1, setPass1] = React.useState("");
    const [pass2, setPass2] = React.useState("");
    const [passLoading, setPassLoading] = React.useState(false);
    const [passError, setPassError] = React.useState("");
    const [passOk, setPassOk] = React.useState("");

    React.useEffect(() => {
        const syncUserFromStorage = () => {
            const saved = localStorage.getItem("user");
            setUser(saved ? JSON.parse(saved) : null);
        };

        window.addEventListener("storage", syncUserFromStorage);
        return () => window.removeEventListener("storage", syncUserFromStorage);
    }, []);

    React.useEffect(() => {
        setImgError(false);
    }, [user?.user_img]);

    const initials =
        ((user?.name?.[0] || "") + (user?.last_name?.[0] || "")).toUpperCase() || "U";

    const showImg = !!user?.user_img && !imgError;

    const handleOpenChangePhoto = () => {
        setUploadError("");
        setSelectedImg(null);
        setOpenImgModal(true);
        setOpenUserMenu(false);
    };

    const handleUploadPhoto = async () => {
        if (!selectedImg) return;

        if (!user?.id) {
            setUploadError("No se encontró el id del usuario.");
            return;
        }

        try {
            setUploading(true);
            setUploadError("");

            const updatedUser = await updateUserImg(user.id, selectedImg);
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setOpenImgModal(false);
            setSelectedImg(null);
        } catch (e) {
            console.error(e);
            setUploadError(e?.response?.data?.message || "Error subiendo la imagen.");
        } finally {
            setUploading(false);
        }
    };

    const handleOpenChangePassword = () => {
        setPassError("");
        setPassOk("");
        setPass1("");
        setPass2("");
        setOpenPassModal(true);
        setOpenUserMenu(false);
    };

    const handleUpdatePassword = async () => {
        if (!user?.id) {
            setPassError("No se encontró el id del usuario.");
            return;
        }

        if (!pass1 || pass1.length < 8) {
            setPassError("La contraseña debe tener mínimo 8 caracteres.");
            return;
        }

        if (pass1 !== pass2) {
            setPassError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setPassLoading(true);
            setPassError("");
            setPassOk("");

            // IMPORTANTE: tu backend usa "confirmed"
            // por eso mandamos password + password_confirmation
            await updatePass(user.id, pass1, pass2);

            setPassOk("Contraseña actualizada exitosamente.");

            setTimeout(() => {
                setOpenPassModal(false);
                setPass1("");
                setPass2("");
            }, 800);
        } catch (e) {
            console.error(e);
            setPassError(e?.response?.data?.message || "Error actualizando la contraseña.");
        } finally {
            setPassLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* HEADER */}
            <header className="bg-neutral backdrop-blur-md border-b border-neutral shadow-lg relative z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Izquierda */}
                        <div className="flex items-center space-x-4">
                            {/* Dropdown */}
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <span className="btn btn-ghost btn-circle text-white">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </span>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow"
                                >
                                    {sections.map((section) => (
                                        <li key={section.title}>
                                            <h2 className="menu-title">{section.title}</h2>
                                            <ul>
                                                {section.items.map((item) => (
                                                    <li key={item.label}>
                                                        <a href={item.href} className="text text-sm sm:text-base">
                                                            <i className={item.icon}></i> {item.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Título + nombre usuario */}
                            <div className="text-white">
                                <a href="/dashboard" className="text-2xl font-bold">
                                    Cooperativa Micope
                                </a>
                                <div>
                                    Bienvenido:{" "}
                                    <strong>
                                        {user?.name} {user?.last_name}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Derecha */}
                        <div className="flex items-center space-x-4">
                            <div className={`dropdown dropdown-end ${openUserMenu ? "dropdown-open" : ""}`}>
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-circle avatar w-13 h-13 sm:w-16 sm:h-16"
                                    onClick={() => setOpenUserMenu((v) => !v)}
                                    onBlur={() => setTimeout(() => setOpenUserMenu(false), 150)}
                                >
                                    <div className="w-13 h-13 rounded-full bg-neutral-content text-black flex items-center justify-center font-semibold overflow-hidden sm:w-16 sm:h-16">
                                        {showImg ? (
                                            <img
                                                src={user?.user_img}
                                                alt={`${user?.name ?? ""} ${user?.last_name ?? ""}`}
                                                className="w-full h-full object-cover pointer-events-none"
                                                onError={() => setImgError(true)}
                                            />
                                        ) : (
                                            <span className="text-sm">{initials}</span>
                                        )}
                                    </div>
                                </button>

                                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow">
                                    <li>
                                        <h2 className="menu-title">
                                            {user?.name} {user?.last_name}
                                        </h2>
                                        <ul>
                                            <li>
                                                <button onClick={onLogout} className="text text-sm sm:text-base">
                                                    <i className="fa-light fa-arrow-right-from-bracket text-red-500" />
                                                    Cerrar sesión
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    onClick={handleOpenChangePassword}
                                                    className="text text-sm sm:text-base"
                                                >
                                                    <i className="fa-duotone fa-solid fa-key text-yellow-500"></i>
                                                    Cambiar contraseña
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    onClick={handleOpenChangePhoto}
                                                    className="text text-sm sm:text-base"
                                                >
                                                    <i className="fa-regular fa-image text-green-500"></i>
                                                    Cambiar foto de perfil
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main className="flex-grow container mx-auto px-4 py-6">
                {children}
                {/* MODAL: CAMBIAR FOTO */}
                {openImgModal && (
                    <dialog open className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Cambiar foto de perfil</h3>

                            <div className="mt-4 space-y-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) => setSelectedImg(e.target.files?.[0] || null)}
                                />

                                {uploadError && <Alert message={uploadError} />}

                            </div>
                            <span className="label-text-alt text-gray-400 mt-1 text-xs">
                                Formato recomendado: JPG / PNG — Máximo 5MB
                            </span>
                            <div className="modal-action">
                                <button className="btn" onClick={() => setOpenImgModal(false)} disabled={uploading}>
                                    Cancelar
                                </button>

                                <button
                                    className="btn btn-primary text-black"
                                    onClick={handleUploadPhoto}
                                    disabled={!selectedImg || uploading}
                                >
                                    {uploading ? "Subiendo..." : "Guardar"}
                                </button>
                            </div>
                        </div>

                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => setOpenImgModal(false)}>close</button>
                        </form>
                    </dialog>
                )}

                {/* MODAL: CAMBIAR CONTRASEÑA */}
                {openPassModal && (
                    <dialog open className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Cambiar contraseña</h3>

                            <div className="mt-4 space-y-3">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Nueva contraseña</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="input input-bordered w-full"
                                        value={pass1}
                                        onChange={(e) => setPass1(e.target.value)}
                                        placeholder="Mínimo 8 caracteres"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Confirmar contraseña</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="input input-bordered w-full"
                                        value={pass2}
                                        onChange={(e) => setPass2(e.target.value)}
                                        placeholder="Repite la contraseña"
                                    />
                                </div>

                                {passError && <Alert message={passError} />}

                                {passOk && (
                                    <div className="alert alert-success">
                                        <span>{passOk}</span>
                                    </div>
                                )}
                            </div>

                            <div className="modal-action">
                                <button
                                    className="btn"
                                    onClick={() => setOpenPassModal(false)}
                                    disabled={passLoading}
                                >
                                    Cancelar
                                </button>

                                <button
                                    className="btn btn-primary text-black"
                                    onClick={handleUpdatePassword}
                                    disabled={passLoading}
                                >
                                    {passLoading ? "Actualizando..." : "Guardar"}
                                </button>
                            </div>
                        </div>

                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => setOpenPassModal(false)}>close</button>
                        </form>
                    </dialog>
                )}
            </main>

            {/* FOOTER */}
            <footer className="footer footer-horizontal footer-center bg-neutral text-base-content rounded p-2">
                <aside>
                    <p className="text-white">Derechos reservados @hours_Company</p>
                </aside>
            </footer>
        </div>
    );
};

export default Layout;
