import React from "react";

export default function ModalCreate({
  isOpen,
  modalId,
  title,
  onSubmit,
  onClose,
  submitLabel = "Guardar",
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open" id={modalId}>
      <div
        className="
          modal-box relative
          bg-white backdrop-blur-xl
          border border-white/20
          shadow-2xl
          text-base-content
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-4 text-left">{title}</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit && onSubmit(e);
          }}
        >
          {children}

          <div className="modal-action flex justify-end gap-2 mt-4">
            <button type="button" className="btn btn-secondary rounded-xl" onClick={onClose}>
              <i className="fa-sharp fa-solid fa-floppy-disk-circle-xmark text-xl"></i>
              Cerrar
            </button>
            <button type="submit" className="btn btn-success text-black text-white rounded-xl">
              <i className="fa-sharp fa-solid fa-floppy-disk text-xl"></i>
              {submitLabel}
            </button>
          </div>
        </form>
      </div>

      {/* Fondo tipo glass (blur + oscurecido) */}
      <div
        className="
          modal-backdrop fixed inset-0
          bg-black/30
          backdrop-blur-md
        "
        onClick={onClose}
      />
    </div>
  );
}
