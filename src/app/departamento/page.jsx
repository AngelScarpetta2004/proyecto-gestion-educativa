"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DepartamentosPage() {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    axios.get("/api/departamentos").then((res) => setDepartamentos(res.data));
  }, []);

  return (
    <div>
      <h1>Departamentos</h1>
      {departamentos.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {departamentos.map((dep) => (
            <li key={dep.id}>{dep.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
