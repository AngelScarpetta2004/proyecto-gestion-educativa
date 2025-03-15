import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Obtener todos los municipios
export async function GET() {
  try {
    const municipios = await prisma.municipio.findMany({
      include: { departamento: true }, // Incluye el departamento al que pertenece
    });
    return NextResponse.json(municipios, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener los municipios", error },
      { status: 500 }
    );
  }
}

// Crear un nuevo municipio
export async function POST(req) {
  try {
    const { nombre, departamentoId } = await req.json();

    if (!nombre || !departamentoId) {
      return NextResponse.json(
        { message: "Nombre y departamentoId son obligatorios" },
        { status: 400 }
      );
    }

    const municipio = await prisma.municipio.create({
      data: { nombre, departamentoId },
    });

    return NextResponse.json(municipio, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear el municipio", error },
      { status: 500 }
    );
  }
}
