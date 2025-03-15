import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todas las sedes
export async function GET() {
  try {
    const sedes = await prisma.sede.findMany({
      include: { colegio: true }, // Incluye el colegio al que pertenece
    });
    return NextResponse.json(sedes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener las sedes", error },
      { status: 500 }
    );
  }
}

// Crear una nueva sede
export async function POST(req) {
  try {
    const { nombre, colegioId } = await req.json();

    if (!nombre || !colegioId) {
      return NextResponse.json(
        { message: "Nombre y colegioId son obligatorios" },
        { status: 400 }
      );
    }

    const sede = await prisma.sede.create({
      data: { nombre, colegioId },
    });

    return NextResponse.json(sede, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear la sede", error },
      { status: 500 }
    );
  }
}
