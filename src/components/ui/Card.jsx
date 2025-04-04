import React from "react";
import "../../styles/Card.css"; // Importa el archivo CSS correcto

export default function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );
}
