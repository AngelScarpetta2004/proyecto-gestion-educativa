"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SedesPage() {
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    axios.get("/api/sedes").then((res) => setSedes(res.data));
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
