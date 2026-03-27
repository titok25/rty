# Advanced Cloaker - Next.js

Um sistema avançado de roteamento de tráfego com múltiplas camadas de proteção, otimizado para deploy na Vercel.

## 🎯 Características

### Camadas de Proteção

1. **Geo-Blocking (Prioritária)**
   - Acesso permitido apenas para IPs do Brasil (BR)
   - Usa `request.geo?.country` (Vercel) ou `x-vercel-ip-country`
   - Tráfego de outros países é redirecionado para a página WHITE

2. **Detecção de Dispositivo e In-App Browser**
   - Identifica acessos de dentro do Instagram, Facebook, TikTok e WhatsApp
   - Detecta User-Agents: FB_IAB, FBAV, Instagram, FBAN, TikTok, WhatsApp
   - Verifica se o dispositivo é mobile (iPhone, Android, iPad, etc.)

3. **Proteção Anti-Bot Exaustiva**
   - Detecta bots conhecidos: Googlebot, Facebot, TikTokBot, ByteSpider, etc.
   - Inclui detecção de HeadlessChrome, Lighthouse e crawlers
   - Filtra requisições de ferramentas HTTP (curl, wget, python, etc.)

4. **Smart Routing**
   - **Página BLACK**: Brasil + Mobile + In-App Browser + Não é Bot
   - **Página WHITE**: Todos os outros (Desktop, Outros Países, Bots, Crawlers)
   - Usa `NextResponse.rewrite` para manter a URL intacta no navegador

## 📁 Estrutura do Projeto

```
cloaker-advanced/
├── middleware.ts                 # Edge middleware com camadas de proteção
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx         # Página inicial com links
│   │   │   ├── Black.tsx        # Página premium (usuários qualificados)
│   │   │   ├── White.tsx        # Página geral (tráfego geral)
│   │   │   ├── NotFound.tsx     # Página 404
│   │   │   └── api/
│   │   │       ├── traffic-info.ts  # API: informações de tráfego
│   │   │       └── health.ts        # API: health check
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── contexts/            # React contexts
│   │   ├── App.tsx              # Roteamento principal
│   │   ├── main.tsx             # Entry point React
│   │   └── index.css            # Estilos globais
│   ├── public/                  # Arquivos estáticos
│   └── index.html               # HTML template
├── package.json                 # Dependências
├── .gitignore                   # Git ignore
└── README.md                    # Este arquivo
```

## 🚀 Como Usar

### 1. Clonar o Repositório

```bash
git clone <seu-repositorio>
cd cloaker-advanced
```

### 2. Instalar Dependências

```bash
pnpm install
# ou
npm install
```

### 3. Executar Localmente

```bash
pnpm dev
# ou
npm run dev
```

Acesse `http://localhost:3000` no navegador.

### 4. Build para Produção

```bash
pnpm build
# ou
npm run build
```

## 📡 Endpoints de API

### GET /api/traffic-info

Retorna informações sobre o tráfego atual:

```json
{
  "success": true,
  "timestamp": "2026-03-27T15:47:13.204Z",
  "traffic": {
    "clientIp": "192.168.1.1",
    "country": "BR",
    "userAgent": "Mozilla/5.0...",
    "device": {
      "isMobile": true,
      "type": "mobile"
    },
    "browser": {
      "isInAppBrowser": true,
      "type": "in-app"
    },
    "security": {
      "isBot": false,
      "status": "human"
    },
    "routing": {
      "decision": "black",
      "page": "/black",
      "criteria": {
        "countryCheck": true,
        "deviceCheck": true,
        "browserCheck": true,
        "botCheck": true
      }
    }
  }
}
```

### GET /api/health

Health check do sistema:

```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-03-27T15:47:13.204Z",
  "service": {
    "name": "Advanced Cloaker",
    "version": "1.0.0",
    "environment": "production"
  },
  "system": {
    "uptime": 3600,
    "memory": {...},
    "nodeVersion": "v22.13.0"
  },
  "endpoints": {
    "trafficInfo": "/api/traffic-info",
    "health": "/api/health"
  }
}
```

## 🌐 Deploy na Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Advanced Cloaker"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/cloaker-advanced.git
   git push -u origin main
   ```

2. **Conectar ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - Vercel detectará automaticamente que é um projeto Next.js
   - Clique em "Deploy"

3. **Configurar Variáveis de Ambiente (se necessário)**
   - Vá para "Settings" → "Environment Variables"
   - Adicione qualquer variável necessária
   - Redeploy se necessário

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
```

## ⚙️ Configuração do Middleware

O arquivo `middleware.ts` está configurado para:

- Aplicar a todas as rotas (exceto arquivos estáticos)
- Usar `request.geo?.country` da Vercel
- Reescrever URLs sem alterar o endereço do navegador
- Executar no Edge Network da Vercel (latência mínima)

### Matcher Padrão

```typescript
matcher: [
  '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
]
```

Isso exclui:
- Arquivos estáticos Next.js
- Imagens otimizadas
- Favicon
- Robots.txt
- Sitemap.xml

## 🔒 Segurança

- ✅ Geo-blocking em nível de edge
- ✅ Detecção de bots e crawlers
- ✅ Identificação de in-app browsers
- ✅ Proteção contra requisições suspeitas
- ✅ URL masking com rewrite
- ✅ Sem exposição de lógica no cliente

## 📊 Monitoramento

Use os endpoints de API para monitorar:

```bash
# Verificar saúde do sistema
curl https://seu-dominio.vercel.app/api/health

# Obter informações de tráfego
curl https://seu-dominio.vercel.app/api/traffic-info
```

## 🛠️ Tecnologias

- **Next.js 15+** - Framework React
- **React 19** - Biblioteca UI
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Componentes UI
- **TypeScript** - Type safety
- **Vercel Edge Network** - Deployment

## 📝 Notas Importantes

1. **Middleware no Edge**: O arquivo `middleware.ts` executa no Edge Network da Vercel, garantindo latência mínima
2. **Geo-Blocking**: Vercel fornece `request.geo?.country` automaticamente
3. **NextResponse.rewrite**: Mantém a URL intacta, evitando suspeitas
4. **Bot Detection**: Lista extensiva de bots e crawlers conhecidos
5. **In-App Browsers**: Detecta padrões de User-Agent de redes sociais

## 🤝 Contribuindo

Sinta-se livre para fazer fork e enviar pull requests!

## 📄 Licença

MIT

## 📞 Suporte

Para suporte e dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para Vercel**
