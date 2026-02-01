export default function Alert({ message, type = "error" }) {
  const baseClass = "alert alert-soft flex items-center gap-2 rounded-md p-3 text-sm";
  const typeClass = type === "error" ? "alert-error" : "alert-success";

  if (!message) return null;

  return (
    <div role="alert" className={`${baseClass} ${typeClass}`}>
      {/* Opcional: ícono */}
      {type === "error" && (
        <i className="fa-duotone fa-regular fa-circle-x"></i>
      )}
      <span>{message}</span>
    </div>
  );
}
