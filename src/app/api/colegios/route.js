// src/app/api/colegios/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const colegios = await prisma.colegio.findMany({
      include: { municipio: true }
    });
    return NextResponse.json(colegios);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validar que el código de colegio tenga el formato correcto
    if (!data.id || data.id.length !== 8) {
      return NextResponse.json(
        { error: 'El código de colegio debe tener 8 dígitos' },
        { status: 400 }
      );
    }
    
    // Extraer el código del municipio (primeros 5 dígitos)
    const municipioId = data.id.substring(0, 5);
    
    // Verificar que el municipio exista
    const municipio = await prisma.municipio.findUnique({
      where: { id: municipioId }
    });
    
    if (!municipio) {
      return NextResponse.json(
        { error: 'El municipio no existe' },
        { status: 400 }
      );
    }
    
    // Crear el colegio
    const colegio = await prisma.colegio.create({
      data: {
        id: data.id,
        nombre: data.nombre,
        municipioId: municipioId
      }
    });
    
    return NextResponse.json(colegio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}