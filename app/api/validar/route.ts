import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const { codigo } = await request.json();

    if (!codigo) {
      return NextResponse.json({ error: 'Código não fornecido' }, { status: 400 });
    }

    const db = getDatabase();
    const pista = db.prepare('SELECT id, ordem, titulo FROM pistas WHERE codigo_validacao = ?').get(codigo);

    if (!pista) {
      return NextResponse.json({ 
        valido: false, 
        mensagem: 'Código inválido. Tente novamente!' 
      });
    }

    return NextResponse.json({ 
      valido: true, 
      pista,
      mensagem: `Parabéns! Você encontrou: ${(pista as any).titulo}` 
    });
  } catch (error) {
    console.error('Erro ao validar código:', error);
    return NextResponse.json({ error: 'Erro ao validar código' }, { status: 500 });
  }
}
