// src/app/municipios/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function Municipios() {
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    nombre: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchMunicipios();
  }, []);

  async function fetchMunicipios() {
    try {
      setLoading(true);
      const res = await fetch('/api/municipios');
      const data = await res.json();
      setMunicipios(data);
    } catch (error) {
      console.error('Error al cargar municipios:', error);
      setError('Error al cargar los municipios. Inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    
    // Si estamos modificando el ID, asegurarnos de que tenga formato correcto
    if (name === 'id') {
      // Solo permitir números y limitar a 3 dígitos (el código del departamento '50' se añade automáticamente)
      const cleanedValue = value.replace(/\D/g, '').slice(0, 3);
      setFormData({
        ...formData,
        [name]: cleanedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError(null);
      setSuccess(null);
      
      // Validar datos
      if (!formData.id || formData.id.length !== 3) {
        setError('El código del municipio debe tener 3 dígitos');
        return;
      }
      
      if (!formData.nombre) {
        setError('El nombre del municipio es obligatorio');
        return;
      }
      
      // Añadir el código del departamento (50 para Meta)
      const fullId = `50${formData.id}`;
      
      const response = await fetch('/api/municipios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: fullId,
          nombre: formData.nombre
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el municipio');
      }
      
      // Limpiar formulario y mostrar mensaje de éxito
      setFormData({
        id: '',
        nombre: ''
      });
      
      setSuccess('Municipio creado exitosamente');
      
      // Recargar la lista de municipios
      fetchMunicipios();
      
    } catch (error) {
      console.error('Error al crear municipio:', error);
      setError(error.message);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Municipios</h1>
        <Link href="/">
          <Button variant="secondary">Volver al Inicio</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Crear Nuevo Municipio">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">
                  <span className="text-gray-600">50</span>
                </div>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Código (3 dígitos)"
                  className="rounded-l-none"
                  maxLength={3}
                  required
                />
              </div>
              
              <Input
                label="Nombre del Municipio"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Puerto López"
                required
              />
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                  {success}
                </div>
              )}
              
              <Button type="submit" className="w-full">
                Guardar Municipio
              </Button>
            </form>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card title="Municipios Registrados">
            {loading ? (
              <div className="text-center py-4">
                <p>Cargando municipios...</p>
              </div>
            ) : municipios.length === 0 ? (
              <div className="text-center py-4">
                <p>No hay municipios registrados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departamento
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {municipios.map((municipio) => (
                      <tr key={municipio.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {municipio.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {municipio.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {municipio.departamento.nombre}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}