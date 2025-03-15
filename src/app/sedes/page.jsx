"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SedesPage() {
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    axios.get("/api/sedes") // Asegura que la URL es correcta
      .then(response => setSedes(response.data))
      .catch(error => console.error("Error al cargar sedes:", error));
  }, []);
  
  return (
    <div>
      <h1>Sedes</h1>
      {sedes.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {sedes.map((sede) => (
            <li key={sede.id}>{sede.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
