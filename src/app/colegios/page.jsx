"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ColegiosPage() {
  const [colegios, setColegios] = useState([]);

  useEffect(() => {
    axios.get("/api/colegios").then((res) => setColegios(res.data));
  }, []);

  return (
    <div>
      <h1>Colegios</h1>
      {colegios.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {colegios.map((col) => (
            <li key={col.id}>{col.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
