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

function parseRole(value: string | undefined): Role | undefined {
  if (!value) return undefined;
  return value === Role.SUPER_ADMIN ? Role.SUPER_ADMIN : Role.ADMIN;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const superAdminError = await requireSuperAdmin();
  if (superAdminError) return superAdminError;

  try {
    const { id } = await params;
    const body = (await request.json()) as {
      email?: string;
      name?: string | null;
      role?: Role;
      isActive?: boolean;
      mustChangePassword?: boolean;
      password?: string;
    };

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const nextRole = parseRole(body.role) ?? existing.role;
    const nextIsActive = body.isActive ?? existing.isActive;
    const nextEmail = body.email ? body.email.toLowerCase().trim() : existing.email;

    if (nextEmail !== existing.email) {
      const sameEmail = await prisma.user.findUnique({ where: { email: nextEmail } });
      if (sameEmail && sameEmail.id !== existing.id) {
        return NextResponse.json({ error: "Email já está em uso" }, { status: 400 });
      }
    }

    const removingSuperAdmin = existing.role === Role.SUPER_ADMIN && nextRole !== Role.SUPER_ADMIN;
    const deactivatingSuperAdmin = existing.role === Role.SUPER_ADMIN && !nextIsActive;
    if (removingSuperAdmin || deactivatingSuperAdmin) {
      const superAdmins = await prisma.user.count({
        where: { role: Role.SUPER_ADMIN, isActive: true },
      });
      if (superAdmins <= 1) {
        return NextResponse.json(
          { error: "Não é possível remover o último SUPER_ADMIN ativo" },
          { status: 400 }
        );
      }
    }

    const data: {
      email: string;
      name: string | null;
      role: Role;
      isActive: boolean;
      mustChangePassword: boolean;
      password?: string;
      passwordChangedAt?: Date;
      failedLoginAttempts?: number;
      lockedUntil?: Date | null;
      resetToken?: null;
      resetTokenExpiresAt?: null;
    } = {
      email: nextEmail,
      name: body.name !== undefined ? (body.name || "").trim() || null : existing.name,
      role: nextRole,
      isActive: nextIsActive,
      mustChangePassword: body.mustChangePassword ?? existing.mustChangePassword,
    };

    if (body.password !== undefined) {
      if (!body.password || body.password.length < 8) {
        return NextResponse.json(
          { error: "A nova senha deve ter pelo menos 8 caracteres" },
          { status: 400 }
        );
      }
      data.password = await bcrypt.hash(body.password, 12);
      data.passwordChangedAt = new Date();
      data.failedLoginAttempts = 0;
      data.lockedUntil = null;
      data.resetToken = null;
      data.resetTokenExpiresAt = null;
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}
