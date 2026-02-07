import React, { useRef, useState, useEffect } from "react";
import Alert from "./alert.jsx";

export default function ModalUploadFile({
  isOpen,
  modalId = "modal-upload-file",
  title = "Subir archivo",
  submitLabel = "Guardar",
  onClose,
  onSubmit,
  accept = "image/*",
  fieldLabel = "Seleccionar archivo",
  required = true,
  loading = false,
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!isOpen) return;
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }, [isOpen]);
  if (!isOpen) return null;
  const handleChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (required && !file) {
      setError("Seleccione un archivo antes de guardar.");
      return;
    }
    await onSubmit?.(file);
  };
  return (
    <div className="modal modal-open" id={modalId}>
      {/* Caja */}
      <div
        className="
          modal-box relative
          bg-white backdrop-blur-xl
          border border-white/20
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="label">
            <span className="label-text font-semibold">{fieldLabel}</span>
          </label>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="file-input file-input-bordered w-full"
            onChange={handleChange}
            disabled={loading}
          />
          {error && <p className="text-sm text-error">{error}</p>}
          {file && (
            <p className="text-sm opacity-70">
              Archivo seleccionado:{" "}
              <span className="font-semibold">{file.name}</span>
            </p>
          )}
          <div className="modal-action flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-secondary rounded-xl"
              onClick={onClose}
              disabled={loading}
            >
              <i className="fa-solid fa-image-circle-xmark text-xl"></i>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-success rounded-xl text-white"
              disabled={loading}
            >
              <i className="fa-solid fa-image-circle-check text-xl"></i>
              {loading ? "Subiendo..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
      {/* Backdrop glass */}
      <div
        className="modal-backdrop fixed inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />
    </div>
  );
}
