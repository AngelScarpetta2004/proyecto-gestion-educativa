import React from "react";
import "@/styles/Select.css"; // Importa el archivo CSS correcto

export function Select({ options = [], ...props }) {
  return (
    <select className="select" {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

