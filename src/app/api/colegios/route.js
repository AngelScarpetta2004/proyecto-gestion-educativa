import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Obtener todos los colegios
export async function GET() {
  try {
    const colegios = await prisma.colegio.findMany({
      include: { municipio: true }, // Incluye el municipio al que pertenece
    });
    return NextResponse.json(colegios, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener los colegios", error },
      { status: 500 }
    );
  }
}

// Crear un nuevo colegio
export async function POST(req) {
  try {
    const { nombre, municipioId } = await req.json();

    if (!nombre || !municipioId) {
      return NextResponse.json(
        { message: "Nombre y municipioId son obligatorios" },
        { status: 400 }
      );
    }

    const colegio = await prisma.colegio.create({
      data: { nombre, municipioId },
    });

    return NextResponse.json(colegio, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear el colegio", error },
      { status: 500 }
    );
  }
}
