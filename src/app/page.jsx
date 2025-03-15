// src/app/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from "@/components/ui/Card"; // ✅ Correcto (sin llaves)
import { Button } from '@/components/ui/Button';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Sistema de Gestión de Instituciones Educativas - Meta
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Municipios">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.municipios}</p>
            <p className="text-gray-600">Registrados</p>
          </div>
          <div className="mt-4">
            <Link href="/municipios">
              <Button variant="primary" className="w-full">
                Gestionar Municipios
              </Button>
            </Link>
          </div>
        </Card>
        
        <Card title="Colegios">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600">{stats.colegios}</p>
            <p className="text-gray-600">Registrados</p>
          </div>
          <div className="mt-4">
            <Link href="/colegios">
              <Button variant="primary" className="w-full">
                Gestionar Colegios
              </Button>
            </Link>
          </div>
        </Card>
        
        <Card title="Sedes Educativas">
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600">{stats.sedes}</p>
            <p className="text-gray-600">Registradas</p>
          </div>
          <div className="mt-4">
            <Link href="/sedes">
              <Button variant="primary" className="w-full">
                Gestionar Sedes
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-semibold mb-4">Acerca del Sistema</h2>
        <p className="mb-4">
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