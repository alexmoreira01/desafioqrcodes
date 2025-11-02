# Missão SIG no Campo: Caça ao Tesouro 🗺️

Aplicação web de caça ao tesouro com leitura de QR codes para validação de locais encontrados.

## 🚀 Funcionalidades

- ✅ Interface responsiva (mobile e desktop)
- 📷 Leitura de QR codes via câmera
- ⌨️ Validação manual de códigos
- 💾 Progresso salvo no localStorage
- 🎯 6 pistas do desafio SIG
- 📊 Barra de progresso visual

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **SQLite** (better-sqlite3) - Banco de dados
- **html5-qrcode** - Leitura de QR codes

## 📦 Instalação

```bash
npm install
```

## 🏃‍♂️ Executar Localmente

```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 🎨 Gerar QR Codes para Impressão

Acesse: `http://localhost:3000/qrcodes.html`

Essa página gera todos os QR codes que devem ser impressos e colocados nos locais correspondentes.

### Códigos de Validação:
1. **DATUM INICIAL** → `DATUM-BLOCO-S`
2. **ALVO DE CLASSIFICAÇÃO** → `CLASSIFICACAO-PAPA`
3. **BUFFER DE INUNDAÇÃO** → `BUFFER-VETOR`
4. **VETOR DA ARQUITETURA** → `VETOR-PALHA`
5. **PIXEL DA TRADIÇÃO** → `PIXEL-CEARA`
6. **CENTRÓIDE NORDESTINO** → `CENTROIDE-FINAL`

## ☁️ Deploy Gratuito na Vercel

### Opção 1: Via GitHub (Recomendado)

1. Crie um repositório no GitHub e faça push do código:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/desafio-qr.git
git push -u origin main
```

2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Add New Project"
4. Importe seu repositório do GitHub
5. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Clique em "Deploy"

### Opção 2: Via CLI da Vercel

```bash
npm i -g vercel
vercel login
vercel
```

### ⚠️ Importante para Deploy

O SQLite funciona perfeitamente em desenvolvimento, mas para produção na Vercel (serverless), você precisa fazer uma pequena alteração:

#### Alternativa 1: Usar Vercel KV (Redis) - GRATUITO
```bash
npm install @vercel/kv
```
Depois configure no painel da Vercel em "Storage" > "Create Database" > "KV"

#### Alternativa 2: Usar Turso (SQLite na nuvem) - GRATUITO
```bash
npm install @libsql/client
```
Crie uma conta em [turso.tech](https://turso.tech)

**Se quiser manter SQLite simples em serverless**, o código atual vai funcionar, mas o banco será recriado a cada deploy. Para persistência, use uma das alternativas acima.

## 📱 Como Usar

1. Abra a aplicação no celular ou desktop
2. Leia as pistas para encontrar os locais
3. Ao encontrar um local, clique em "Escanear QR Code"
4. Aponte a câmera para o QR code no local
5. Ou insira o código manualmente
6. Acompanhe seu progresso!

## 🌐 Hospedagem Gratuita - Outras Opções

- **Vercel** (Recomendado) - Ilimitado, SSL grátis
- **Netlify** - Alternativa similar
- **Railway** - Suporta melhor bancos de dados
- **Render** - Boa para apps com DB

## 📄 Estrutura do Projeto

```
desafio-qr/
├── app/
│   ├── api/
│   │   ├── pistas/route.ts    # Lista todas as pistas
│   │   └── validar/route.ts   # Valida códigos QR
│   ├── layout.tsx
│   └── page.tsx               # Página principal
├── components/
│   └── QRScanner.tsx          # Componente de leitura QR
├── lib/
│   └── database.ts            # Configuração SQLite
├── data/
│   └── desafio.db             # Banco de dados (criado automaticamente)
└── public/
    └── qrcodes.html           # Gerador de QR codes
```

## 🔧 Desenvolvimento

O banco de dados é criado automaticamente na primeira execução. As 6 pistas são inseridas automaticamente.

## 📝 Licença

MIT

---

Desenvolvido para a Missão SIG no Campo 🎯

