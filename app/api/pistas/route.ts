import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    const db = getDatabase();
    const pistas = db.prepare('SELECT id, ordem, titulo, descricao, latitude, longitude FROM pistas ORDER BY ordem').all();
    
    return NextResponse.json({ pistas });
  } catch (error) {
    console.error('Erro ao buscar pistas:', error);
    return NextResponse.json({ error: 'Erro ao buscar pistas' }, { status: 500 });
  }
}
