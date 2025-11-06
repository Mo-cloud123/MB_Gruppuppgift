import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = 
    type === "success" ? "#22c55e" : 
    type === "error" ? "#ef4444" : 
    type === "info" ? "#3b82f6" : 
    "#3b82f6";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: bgColor,
        color: "white",
        padding: "1rem 1.5rem",
        borderRadius: "12px",
        boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
        zIndex: 1000,
        animation: "slideIn 0.3s ease-out",
        maxWidth: "400px",
      }}
    >
      {message}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

