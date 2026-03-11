import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Rota para criar o primeiro admin (só funciona se não existir nenhum)
export async function POST(request: NextRequest) {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: { in: ["ADMIN", "SUPER_ADMIN"] } },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Um administrador já existe" },
        { status: 400 }
      );
    }

    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "Administrador",
        role: "SUPER_ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Erro ao criar administrador" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: { in: ["ADMIN", "SUPER_ADMIN"] } },
    });

    return NextResponse.json({
      hasAdmin: !!existingAdmin,
    });
  } catch (error) {
    return NextResponse.json({ hasAdmin: false });
  }
}
