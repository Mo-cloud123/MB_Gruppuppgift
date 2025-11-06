export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid #1f2937",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ margin: "0 0 1.5rem 0", fontSize: "1.1rem" }}>{message}</p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn"
            onClick={onCancel}
            style={{ background: "#6b7280" }}
          >
            Avbryt
          </button>
          <button 
            type="button"
            className="btn" 
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
          >
            Bekräfta
          </button>
        </div>
      </div>
    </div>
  );
}

