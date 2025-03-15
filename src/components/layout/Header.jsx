import React from "react";
import "../../styles/Header.css"; // Ruta relativa desde layout/Footer.jsx
 // Importa el archivo CSS correcto
export function Header() {
  return (
    <header className="header">
      <h1>Gestión Educativa Meta</h1>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/colegios">Colegios</a></li>
          <li><a href="/municipios">Municipios</a></li>
          <li><a href="/sedes">Sedes</a></li>
        </ul>
      </nav>
    </header>
  );
}
