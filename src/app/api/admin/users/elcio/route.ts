import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const ELCIO_EMAIL = "vendas@raemtools.com.br";
const ELCIO_NAME = "Elcio";

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const session = await getSession();
  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Acesso restrito ao SUPER_ADMIN" }, { status: 403 });
  }

  try {
    const { password } = (await request.json()) as { password?: string };
    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "A senha do Elcio deve ter pelo menos 8 caracteres" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.upsert({
      where: { email: ELCIO_EMAIL },
      update: {
        name: ELCIO_NAME,
        role: Role.ADMIN,
        isActive: true,
        mustChangePassword: true,
        password: hashedPassword,
        passwordChangedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
      create: {
        email: ELCIO_EMAIL,
        name: ELCIO_NAME,
        role: Role.ADMIN,
        isActive: true,
        mustChangePassword: true,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Acesso dedicado do Elcio criado/atualizado com sucesso.",
      user,
    });
  } catch (error) {
    console.error("Error provisioning Elcio user:", error);
    return NextResponse.json({ error: "Erro ao provisionar acesso do Elcio" }, { status: 500 });
  }
}
