import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    // Sempre responder sucesso para evitar enumeração de usuários
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "Se o e-mail existir, você receberá instruções para redefinir a senha.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiresAt,
      },
    });

    // Integração de envio de e-mail pode consumir este token.
    // Em ambiente local de desenvolvimento, o token é logado para teste controlado.
    if (process.env.NODE_ENV !== "production") {
      console.log(`[auth] reset token for ${user.email}: ${resetToken}`);
    }

    return NextResponse.json({
      success: true,
      message: "Se o e-mail existir, você receberá instruções para redefinir a senha.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Erro ao recuperar senha" },
      { status: 500 }
    );
  }
}
