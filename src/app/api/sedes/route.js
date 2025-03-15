// src/app/api/sedes/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sedes = await prisma.sede.findMany({
      include: { colegio: true }
    });
    return NextResponse.json(sedes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validar que el código de sede tenga el formato correcto
    if (!data.id || data.id.length !== 11) {
      return NextResponse.json(
        { error: 'El código de sede debe tener 11 dígitos' },
        { status: 400 }
      );
    }
    
    // Extraer el código del colegio (primeros 8 dígitos)
    const colegioId = data.id.substring(0, 8);
    
    // Verificar que el colegio exista
    const colegio = await prisma.colegio.findUnique({
      where: { id: colegioId }
    });
    
    if (!colegio) {
      return NextResponse.json(
        { error: 'El colegio no existe' },
        { status: 400 }
      );
    }
    
    // Crear la sede
    const sede = await prisma.sede.create({
      data: {
        id: data.id,
        nombre: data.nombre,
        direccion: data.direccion || null,
        colegioId: colegioId
      }
    });
    
    return NextResponse.json(sede, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}