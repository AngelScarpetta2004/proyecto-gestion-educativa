// src/app/api/municipios/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const municipios = await prisma.municipio.findMany({
      include: { departamento: true }
    });
    return NextResponse.json(municipios);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validar que el código de municipio tenga el formato correcto
    if (!data.id || data.id.length !== 5) {
      return NextResponse.json(
        { error: 'El código de municipio debe tener 5 dígitos' },
        { status: 400 }
      );
    }
    
    // Extraer el código del departamento (primeros 2 dígitos)
    const departamentoId = data.id.substring(0, 2);
    
    // Verificar que el departamento exista
    const departamento = await prisma.departamento.findUnique({
      where: { id: departamentoId }
    });
    
    if (!departamento) {
      return NextResponse.json(
        { error: 'El departamento no existe' },
        { status: 400 }
      );
    }
    
    // Crear el municipio
    const municipio = await prisma.municipio.create({
      data: {
        id: data.id,
        nombre: data.nombre,
        departamentoId: departamentoId
      }
    });
    
    return NextResponse.json(municipio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
