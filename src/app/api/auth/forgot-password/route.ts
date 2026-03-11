import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email não encontrado" },
        { status: 404 }
      );
    }

    // Gera uma nova senha aleatória
    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Atualiza a senha no banco
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // TODO: Configurar SMTP e enviar email com a nova senha
    // Por enquanto, apenas loga a nova senha no console (remover em produção)
    console.log(`Nova senha para ${email}: ${newPassword}`);

    return NextResponse.json({
      success: true,
      message: "Nova senha gerada com sucesso",
      // Em produção, remover isso - só para teste
      tempPassword: newPassword,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Erro ao recuperar senha" },
      { status: 500 }
    );
  }
}
