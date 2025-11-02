# 🚀 Guia de Hospedagem Gratuita

## ✅ MELHOR OPÇÃO: Vercel (Recomendado)

### Por que Vercel?
- ✅ Criadores do Next.js (100% compatível)
- ✅ Deploy em 2 minutos
- ✅ SSL grátis (HTTPS automático)
- ✅ Domínio grátis (.vercel.app)
- ✅ Atualizações automáticas via Git
- ✅ 100GB de tráfego/mês GRÁTIS

### Como fazer Deploy na Vercel

#### Método 1: Via GitHub (MAIS FÁCIL)

1. **Criar repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Aplicação de caça ao tesouro com QR codes"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/desafio-qr.git
   git push -u origin main
   ```

2. **Acessar Vercel:**
   - Vá em [vercel.com/signup](https://vercel.com/signup)
   - Faça login com GitHub
   - Clique em "Add New Project"
   - Selecione seu repositório `desafio-qr`

3. **Configurar:**
   - Framework Preset: **Next.js** (detectado automaticamente)
   - Root Directory: `./` (padrão)
   - Build Command: `npm run build` (padrão)
   - Output Directory: `.next` (padrão)

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde 1-2 minutos
   - Pronto! Seu site estará no ar: `https://desafio-qr.vercel.app`

5. **Atualizações Futuras:**
   - Faça mudanças no código
   - Commit e push para GitHub
   - Vercel faz deploy automático!

#### Método 2: Via CLI da Vercel (RÁPIDO)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

---

## ⚠️ IMPORTANTE: SQLite em Produção

O SQLite funciona **perfeitamente em desenvolvimento local**, mas em produção na Vercel (ambiente serverless), há uma limitação:

### Problema:
- Serverless functions não mantêm arquivos entre execuções
- O banco seria recriado a cada requisição

### Solução 1: Usar Vercel KV (Redis) - GRÁTIS ✅

**Mais simples para este projeto!**

1. No painel da Vercel, vá em seu projeto
2. Clique em "Storage" → "Create Database" → "KV"
3. Instale o pacote:
   ```bash
   npm install @vercel/kv
   ```

4. Modifique `lib/database.ts`:
   ```typescript
   import { kv } from '@vercel/kv';
   
   export async function getPistas() {
     let pistas = await kv.get('pistas');
     if (!pistas) {
       pistas = [/* suas pistas */];
       await kv.set('pistas', pistas);
     }
     return pistas;
   }
   ```

### Solução 2: Turso (SQLite na nuvem) - GRÁTIS ✅

**Melhor para manter SQLite!**

1. Criar conta em [turso.tech](https://turso.tech)
2. Instalar CLI:
   ```bash
   npm install @libsql/client
   ```

3. Criar banco:
   ```bash
   turso db create desafio-qr
   turso db show desafio-qr
   ```

4. Copiar a URL e o token, adicionar em `.env.local`:
   ```
   TURSO_DATABASE_URL=libsql://...
   TURSO_AUTH_TOKEN=eyJh...
   ```

5. Na Vercel, adicionar as mesmas variáveis em Settings → Environment Variables

### Solução 3: Manter SQLite Simples (OK para MVP)

**O código atual funciona**, mas:
- O banco é recriado a cada deploy
- Não há persistência de dados de usuários
- As **6 pistas sempre estarão lá** (são inseridas no código)
- O **progresso dos usuários fica no localStorage do navegador** (não afetado)

**Conclusão**: Para este projeto específico, o código atual funciona bem pois:
- As pistas estão fixas no código
- O progresso é salvo no navegador do usuário
- Não há dados críticos a persistir no servidor

---

## 🌐 Outras Opções de Hospedagem Gratuita

### Netlify
- Similar à Vercel
- 100GB de tráfego/mês
- Deploy: [netlify.com](https://netlify.com)

### Railway
- Melhor para aplicações com banco de dados persistente
- 5$/mês grátis de créditos
- Deploy: [railway.app](https://railway.app)

### Render
- Boa alternativa
- Web service gratuito
- Deploy: [render.com](https://render.com)

---

## 📊 Comparativo

| Plataforma | Tráfego | BD Incluído | Facilidade | Next.js |
|------------|---------|-------------|------------|---------|
| **Vercel** | 100GB | KV grátis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Netlify | 100GB | Não | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Railway | 500h | Sim | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Render | 750h | PostgreSQL | ⭐⭐⭐ | ⭐⭐⭐ |

---

## 🎯 Recomendação Final

**Para este projeto:**

1. **Primeira opção**: Deploy na Vercel com código atual
   - Funciona perfeitamente
   - Zero configuração adicional
   - Pistas estão no código
   - Progresso salvo no navegador

2. **Se quiser adicionar features futuras** (ranking, histórico global):
   - Use Vercel KV (mais simples)
   - OU Turso (SQLite completo)

---

## 🔗 Links Úteis

- [Vercel Next.js Deploy](https://vercel.com/docs/frameworks/nextjs)
- [Vercel KV Docs](https://vercel.com/docs/storage/vercel-kv)
- [Turso Docs](https://docs.turso.tech/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Conclusão**: Faça o deploy na Vercel agora mesmo! Demora 2 minutos e funciona perfeitamente. 🚀
