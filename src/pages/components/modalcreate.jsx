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
          bg-white/10 backdrop-blur-xl
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
            <button type="submit" className="btn btn-primary text-black">
              {submitLabel}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>

      {/* Fondo tipo glass (blur + oscurecido) */}
      <div
        className="
          modal-backdrop fixed inset-0
          bg-black/40
          backdrop-blur-md
        "
        onClick={onClose}
      />
    </div>
  );
}
