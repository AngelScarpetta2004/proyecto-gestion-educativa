import React from "react";
import "@/styles/Input.css"; // Importa el archivo CSS correcto

export function Input({ type = "text", placeholder, ...props }) {
  return <input type={type} placeholder={placeholder} className="input" {...props} />;
}
