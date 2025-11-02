import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'desafio.db');
let db: Database.Database | null = null;

export function getDatabase() {
  if (!db) {
    db = new Database(dbPath);
    initDatabase();
  }
  return db;
}

function initDatabase() {
  if (!db) return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS pistas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ordem INTEGER NOT NULL UNIQUE,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      codigo_validacao TEXT NOT NULL UNIQUE,
      latitude REAL,
      longitude REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS progresso (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id TEXT NOT NULL,
      pista_id INTEGER NOT NULL,
      encontrada BOOLEAN DEFAULT FALSE,
      encontrada_em DATETIME,
      FOREIGN KEY (pista_id) REFERENCES pistas(id),
      UNIQUE(usuario_id, pista_id)
    );
  `);

  // Inserir as 6 pistas com coordenadas reais
  // Conversão: Graus + (Minutos / 60) = Decimal
  const pistas = [
    {
      ordem: 1,
      titulo: 'DATUM INICIAL (BLOCO S)',
      descricao: 'A nossa Base de Referência (Datum) está definida: onde o saber do Bloco S tem seu Ponto Zero. O próximo Alvo é uma Estrutura de Grande Proporção, um Ícone Católico cuja Assinatura Espectral domina a paisagem. Ela está a Leste, seguindo a principal Via de Acesso (Rodovia) do Campus.',
      codigo_validacao: 'DATUM-BLOCO-S',
      latitude: -16.734400,  // 16°44.0640'S
      longitude: -49.213450  // 49°12.8070'W
    },
    {
      ordem: 2,
      titulo: 'ALVO DE CLASSIFICAÇÃO',
      descricao: 'A Classificação Supervisionada do Campus foi um sucesso. Este Objeto Geográfico (o Papa) agora aponta para onde a Proximidade é um problema. Nosso próximo destino é um Corpo D\'água cercado por um Buffer de Inundação... e pequenas Arquiteturas Rurais. Fica na direção Sudoeste deste ponto.',
      codigo_validacao: 'CLASSIFICACAO-PAPA',
      latitude: -16.736217,  // 16°44.1730'S
      longitude: -49.213850  // 49°12.8310'W
    },
    {
      ordem: 3,
      titulo: 'BUFFER DE INUNDAÇÃO',
      descricao: 'Localizado na margem do Corpo Hídrico que transborda, o próximo ponto é um Vetor bem conhecido. Para encontrá-lo, procure, a Oeste, a Construção Isolada (Polígono) cujo apelido popular é o oposto de santidade e sugere uma REUNIÃO DE AFINS..., mas sem laços de parentesco.',
      codigo_validacao: 'BUFFER-VETOR',
      latitude: -16.736400,  // 16°44.1840'S
      longitude: -49.214833  // 49°12.8900'W
    },
    {
      ordem: 4,
      titulo: 'VETOR DA ARQUITETURA',
      descricao: 'O Polígono da Casa das Primas revela um Vetor de Fofoca! Para a próxima Imagem de Satélite, você deve buscar o local de Baixa Resolução e Assinatura Espectral Natural, onde a habitação é feita de PALHA. Saia desta área VETORIAL e caminhe em direção ao Norte dentro do Memorial.',
      codigo_validacao: 'VETOR-PALHA',
      latitude: -16.736350,  // 16°44.1810'S
      longitude: -49.215950  // 49°12.9570'W
    },
    {
      ordem: 5,
      titulo: 'PIXEL DA TRADIÇÃO',
      descricao: 'O Elemento Mínimo (Pixel) da Arquitetura Tradicional foi encontrado! O Tesouro Final está fora dos Limites Municipais do Campus. Nosso último Centróide é o único Objeto Geográfico com o nome do estado natal do Dragão do Mar. É o DATUM CEARÁ. Para lá, vá no menor Caminho de Mínimo Custo!',
      codigo_validacao: 'PIXEL-CEARA',
      latitude: -16.735050,  // 16°44.1030'S
      longitude: -49.215833  // 49°12.9500'W
    },
    {
      ordem: 6,
      titulo: 'CENTRÓIDE NORDESTINO',
      descricao: 'Parabéns, Geoprocessador! Você atingiu o Centróide da Alegria! Este é o nosso Ponto Geodésico final. Seu tesouro são quatro fichas para poder curtir depois de uma "caça". O Datum Ceará espera por você! A missão de mapeamento está completa. PROSIT!',
      codigo_validacao: 'CENTROIDE-FINAL',
      latitude: -16.741139,  // 16°44'28.1"S (44 + 28.1/60 = 44.468333)
      longitude: -49.209861  // 49°12'35.5"W (12 + 35.5/60 = 12.591667)
    }
  ];

  const insert = db.prepare(`
    INSERT OR IGNORE INTO pistas (ordem, titulo, descricao, codigo_validacao, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  pistas.forEach(pista => {
    insert.run(pista.ordem, pista.titulo, pista.descricao, pista.codigo_validacao, pista.latitude, pista.longitude);
  });
}

export type Pista = {
  id: number;
  ordem: number;
  titulo: string;
  descricao: string;
  codigo_validacao: string;
  latitude?: number;
  longitude?: number;
};

export type Progresso = {
  id: number;
  usuario_id: string;
  pista_id: number;
  encontrada: boolean;
  encontrada_em: string | null;
};
