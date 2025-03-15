// src/app/api/departamentos/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const departamentos = await prisma.departamento.findMany();
    return NextResponse.json(departamentos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}