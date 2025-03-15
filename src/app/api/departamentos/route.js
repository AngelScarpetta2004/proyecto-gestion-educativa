import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Manejar solicitud GET para obtener todos los departamentos
export async function GET() {
  try {
    const departamentos = await prisma.departamento.findMany();
    return NextResponse.json(departamentos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener los departamentos", error },
      { status: 500 }
    );
  }
}

// Manejar solicitud POST para crear un nuevo departamento
export async function POST(req) {
  try {
    const { nombre } = await req.json();

    if (!nombre) {
      return NextResponse.json(
        { message: "El nombre del departamento es obligatorio" },
        { status: 400 }
      );
    }

    const departamento = await prisma.departamento.create({
      data: { nombre },
    });

    return NextResponse.json(departamento, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear el departamento", error },
      { status: 500 }
    );
  }
}
