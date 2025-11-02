# 🎯 Guia Rápido - Como Usar a Aplicação

## Para o Organizador do Desafio

### 1️⃣ Gerar e Imprimir QR Codes

1. Com o servidor rodando (`npm run dev`), acesse:
   ```
   http://localhost:3000/qrcodes.html
   ```

2. A página mostrará 6 QR codes, um para cada local

3. **Imprima esta página** (Ctrl+P ou Cmd+P)
   - Os QR codes estão otimizados para impressão
   - Cada um tem título e código visível

4. **Recorte e coloque** cada QR code no local correspondente à sua pista

### 2️⃣ Códigos dos Locais

| Local | Código a ser impresso |
|-------|----------------------|
| 1. Bloco S (DATUM INICIAL) | `DATUM-BLOCO-S` |
| 2. Igreja/Papa (ALVO) | `CLASSIFICACAO-PAPA` |
| 3. Lago (BUFFER) | `BUFFER-VETOR` |
| 4. Casa das Primas | `VETOR-PALHA` |
| 5. Oca de Palha | `PIXEL-CEARA` |
| 6. Local Final (Ceará) | `CENTROIDE-FINAL` |

### 3️⃣ Proteger os QR Codes

💡 **Dica**: Plastifique os QR codes ou coloque em sacos plásticos transparentes para proteger da chuva e sujeira.

---

## Para os Participantes

### Como Participar

1. **Acesse a aplicação** no celular ou computador:
   ```
   https://seu-site.vercel.app
   ```

2. **Leia as pistas** na página principal

3. **Procure o local** descrito na pista

4. **Ao encontrar**, escolha uma opção:
   - 📷 **Clique em "Escanear QR Code"** e aponte a câmera
   - ⌨️ **OU digite o código manualmente** no campo de texto

5. **Acompanhe seu progresso** na barra no topo

6. **Complete todas as 6 pistas** para ganhar o prêmio! 🎉

### Dicas

- ✅ O progresso é salvo automaticamente no seu celular
- ✅ Você pode fechar e abrir o app sem perder o progresso
- ✅ Funciona online e offline (depois de carregar uma vez)
- ✅ Permite câmera frontal ou traseira

---

## Deploy na Vercel (GRÁTIS)

### Passo a Passo Simplificado

1. **Criar conta**: Acesse [vercel.com](https://vercel.com) e crie uma conta grátis

2. **Instalar CLI** (opcional):
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

3. **OU via GitHub**:
   - Suba o código para o GitHub
   - No Vercel, clique "New Project"
   - Importe o repositório
   - Clique "Deploy"

4. **Pronto!** Seu site estará no ar em segundos
   - URL: `https://desafio-qr.vercel.app` (ou similar)
   - SSL grátis (HTTPS)
   - Atualizações automáticas

### Outras Opções Grátis

- **Netlify**: Similar à Vercel
- **Railway**: Melhor para bancos de dados
- **Render**: Boa alternativa

---

## Testando Localmente

### Sem câmera disponível?

Use a validação manual:
1. Veja o código na página `/qrcodes.html`
2. Digite o código manualmente
3. Clique em "Validar"

### Exemplo de teste:
```
Digite: DATUM-BLOCO-S
Resultado: ✅ "Parabéns! Você encontrou: DATUM INICIAL (BLOCO S)"
```

---

## Personalização

### Alterar as Pistas

Edite o arquivo `lib/database.ts` na seção `pistas`:

```typescript
{
  ordem: 1,
  titulo: 'SEU TÍTULO',
  descricao: 'SUA DESCRIÇÃO',
  codigo_validacao: 'SEU-CODIGO'
}
```

### Alterar Cores/Estilo

Edite `app/page.tsx` e `components/QRScanner.tsx` - todas as cores estão usando Tailwind CSS.

---

## Problemas Comuns

### ❌ Câmera não funciona
- Verifique permissões do navegador
- Use HTTPS (necessário para câmera)
- Tente outro navegador (Chrome/Safari)

### ❌ QR Code não é reconhecido
- Certifique-se de que há boa iluminação
- Segure o celular firme
- Use a validação manual como backup

### ❌ Banco de dados não cria
- Verifique se a pasta `data/` existe
- Rode `npm install` novamente

---

## Suporte

Para dúvidas ou problemas, verifique:
- README.md - Documentação completa
- Console do navegador (F12) - Ver erros
- Terminal - Ver logs do servidor

**Bom desafio! 🎯🗺️**
