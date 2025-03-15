import React from "react";
import "../../styles/Sidebar.css"; // Ruta relativa desde layout/Footer.jsx


export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="/departamentos">Departamentos</a></li>
          <li><a href="/municipios">Municipios</a></li>
          <li><a href="/colegios">Colegios</a></li>
          <li><a href="/sedes">Sedes</a></li>
        </ul>
      </nav>
    </aside>
  );
}
