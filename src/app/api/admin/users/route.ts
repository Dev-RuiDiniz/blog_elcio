import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { requireAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

async function requireSuperAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Acesso restrito ao SUPER_ADMIN" }, { status: 403 });
  }
  return null;
}

function parseRole(value: string | undefined): Role {
  return value === Role.SUPER_ADMIN ? Role.SUPER_ADMIN : Role.ADMIN;
}

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const users = await prisma.user.findMany({
      where: { role: { in: [Role.ADMIN, Role.SUPER_ADMIN] } },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
        lastLoginAt: true,
        failedLoginAttempts: true,
        lockedUntil: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ role: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const superAdminError = await requireSuperAdmin();
  if (superAdminError) return superAdminError;

  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      password?: string;
      role?: Role;
      isActive?: boolean;
      mustChangePassword?: boolean;
    };

    const email = (body.email || "").toLowerCase().trim();
    const name = (body.name || "").trim();
    const password = body.password || "";
    const role = parseRole(body.role);

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 8 caracteres" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        role,
        isActive: body.isActive ?? true,
        mustChangePassword: body.mustChangePassword ?? true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}
