"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MunicipiosPage() {
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    axios.get("/api/municipios").then((res) => setMunicipios(res.data));
  }, []);

  return (
    <div>
      <h1>Municipios</h1>
      {municipios.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {municipios.map((mun) => (
            <li key={mun.id}>{mun.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
