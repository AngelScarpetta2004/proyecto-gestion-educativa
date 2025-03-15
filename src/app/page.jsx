"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from "../components/ui/Card";
import { Button } from '../components/ui/Button';

export default function Home() {
  const [stats, setStats] = useState({
    municipios: 0,
    colegios: 0,
    sedes: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [municipiosRes, colegiosRes, sedesRes] = await Promise.all([
          fetch('/api/municipios'),
          fetch('/api/colegios'),
          fetch('/api/sedes')
        ]);
        
        const municipios = await municipiosRes.json();
        const colegios = await colegiosRes.json();
        const sedes = await sedesRes.json();
        
        setStats({
          municipios: municipios.length,
          colegios: colegios.length,
          sedes: sedes.length
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    }
    
    fetchStats();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo-principal">
        Sistema de Gestión de Instituciones Educativas - Meta
      </h1>
      
      <div className="tarjetas">
        <Card title="Municipios">
          <div className="info">
            <p className="numero azul">{stats.municipios}</p>
            <p className="subtitulo">Registrados</p>
          </div>
          <div className="boton-container">
            <Link href="/municipios">
              <Button className="boton">Gestionar Municipios</Button>
            </Link>
          </div>
        </Card>
        
        <Card title="Colegios">
          <div className="info">
            <p className="numero verde">{stats.colegios}</p>
            <p className="subtitulo">Registrados</p>
          </div>
          <div className="boton-container">
            <Link href="/colegios">
              <Button className="boton">Gestionar Colegios</Button>
            </Link>
          </div>
        </Card>
        
        <Card title="Sedes Educativas">
          <div className="info">
            <p className="numero morado">{stats.sedes}</p>
            <p className="subtitulo">Registradas</p>
          </div>
          <div className="boton-container">
            <Link href="/sedes">
              <Button className="boton">Gestionar Sedes</Button>
            </Link>
          </div>
        </Card>
      </div>
      
      <div className="acerca">
        <h2 className="subtitulo">Acerca del Sistema</h2>
        <p>
          Este sistema permite la gestión eficiente de las instituciones educativas del Departamento del Meta, 
          facilitando la administración de municipios, colegios y sedes educativas.
        </p>
        <p>
          Desarrollado para la Secretaría de Educación del Meta, garantizando la integridad y seguridad de 
          la información administrativa de las instituciones educativas.
        </p>
      </div>
    </div>
  );
}
