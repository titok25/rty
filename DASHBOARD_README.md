# Dashboard Advanced Cloaker

Painel de controle completo para gerenciar campanhas, monitorar tráfego e analisar dados de roteamento.

## 🚀 Como Acessar o Dashboard

### Caminho para Entrar no Painel

1. **URL de Acesso**: `https://seu-dominio.vercel.app/dashboard/login`
   - Substitua `seu-dominio` pelo seu domínio real na Vercel

2. **Credenciais de Demo**:
   - **Senha**: `admin123`
   - Nota: Em produção, integre com um sistema de autenticação real

3. **Fluxo de Login**:
   - Acesse `/dashboard/login`
   - Digite a senha: `admin123`
   - Clique em "Entrar no Dashboard"
   - Você será redirecionado para `/dashboard`

## 📊 Funcionalidades do Dashboard

### 1. Gerenciador de Links (Aba: Gerenciar Links)

#### Criar Links Infinitos

- **Botão**: "Criar Novo Link"
- **Campos**:
  - **Nome da Campanha**: Identificador único (ex: "Campanha Verão 2026")
  - **Página de Destino**: 
    - Black Page (Premium)
    - White Page (Geral)
    - URL Customizada (sua própria URL)
  - **URL Customizada** (opcional): Se escolher "URL Customizada"

#### Gerenciar Links Criados

Cada link exibe:
- **Nome da Campanha**: Identificador
- **ID do Link**: Código único para rastreamento
- **Data de Criação**: Quando foi criado
- **Contador de Cliques**: Total de acessos
- **Link da Campanha**: URL completa para compartilhar
- **Botões de Ação**:
  - **Copiar**: Copia o link para a área de transferência
  - **Editar**: Modifica o link existente
  - **Testar**: Abre o link em nova aba
  - **Deletar**: Remove o link

#### Exemplo de Link Gerado

```
https://seu-dominio.vercel.app/?campaign=abc12345
```

Quando alguém acessa este link:
1. O middleware verifica o país, dispositivo e tipo de navegador
2. Redireciona para a página BLACK ou WHITE conforme os critérios
3. O acesso é registrado nos logs de tráfego

#### Estatísticas de Links

- **Total de Links**: Quantidade de campanhas criadas
- **Total de Cliques**: Soma de todos os acessos
- **Cliques Médios**: Média de acessos por link

### 2. Monitor de Tráfego (Aba: Monitorar Tráfego)

#### Visualização em Tempo Real

**Cartões de Estatísticas**:
- **Total**: Todos os acessos registrados
- **Black**: Acessos para página premium
- **White**: Acessos para página geral
- **Bloqueados**: Acessos identificados como bots
- **Brasil**: Acessos originários do Brasil

#### Filtros de Tráfego

Selecione para visualizar:
- **Todos os Acessos**: Mostra tudo
- **Apenas Black Page**: Apenas acessos qualificados
- **Apenas White Page**: Apenas tráfego geral
- **Apenas Bloqueados**: Apenas bots e crawlers
- **Apenas Brasil**: Apenas IPs brasileiros

#### Controles

- **Ao Vivo**: Ativa/desativa atualização automática (a cada 3 segundos)
- **Exportar**: Baixa os logs em formato JSON
- **Limpar**: Remove todos os logs

#### Informações por Acesso

Cada log mostra:
- **Ícone de Status**: ✓ Permitido ou ⚠️ Bloqueado
- **País**: Código do país (BR, US, UK, etc.)
- **Tipo de Dispositivo**: Mobile ou Desktop
- **Tipo de Navegador**: In-App ou Regular
- **Status de Bot**: Se foi identificado como bot
- **Página de Destino**: Para qual página foi redirecionado (Black ou White)
- **Horário**: Hora exata do acesso

#### Detalhes Expandidos

Clique em qualquer log para expandir e ver:
- **IP do Cliente**: Endereço IP de origem
- **Status**: Bloqueado ou Permitido
- **User-Agent**: String completa do navegador

## 🔐 Autenticação

### Sistema de Login

1. **Página de Login**: `/dashboard/login`
2. **Proteção**: Verifica se há token válido em `localStorage`
3. **Logout**: Botão "Sair" no topo do dashboard
4. **Sessão**: Armazenada em `localStorage` do navegador

### Em Produção

Para produção, recomendamos:
- Integrar com OAuth (Google, GitHub)
- Usar JWT tokens
- Implementar 2FA
- Usar HTTPS obrigatoriamente

## 📈 Dados Armazenados

### LocalStorage

Os dados são salvos localmente no navegador:

```javascript
// Links de Campanha
localStorage.getItem("campaignLinks")

// Logs de Tráfego
localStorage.getItem("trafficLogs")

// Token de Autenticação
localStorage.getItem("dashboardToken")

// Hora de Login
localStorage.getItem("loginTime")
```

### Estrutura de Link

```json
{
  "id": "abc12345",
  "name": "Campanha Verão",
  "targetPage": "black",
  "customUrl": "",
  "createdAt": "2026-03-27T15:47:13.204Z",
  "clicks": 42
}
```

### Estrutura de Log de Tráfego

```json
{
  "id": "xyz789",
  "timestamp": "2026-03-27T15:47:13.204Z",
  "country": "BR",
  "device": "mobile",
  "browser": "in-app",
  "isBot": false,
  "decision": "black",
  "userAgent": "Mozilla/5.0...",
  "clientIp": "192.168.1.1"
}
```

## 🎯 Casos de Uso

### Caso 1: Campanha de Verão para Brasil

1. Criar link: "Campanha Verão 2026" → Black Page
2. Compartilhar link em redes sociais
3. Monitorar acessos em tempo real
4. Ver quantos usuários foram para a página premium

### Caso 2: Teste A/B

1. Criar link A: "Teste A" → Black Page
2. Criar link B: "Teste B" → White Page
3. Compartilhar links diferentes
4. Comparar estatísticas de cliques

### Caso 3: URL Customizada

1. Criar link: "Minha Página" → URL Customizada
2. Inserir: `https://meu-site.com/oferta-especial`
3. Compartilhar link da campanha
4. Usuários qualificados vão para sua página

## 📱 Responsividade

O dashboard é totalmente responsivo:
- **Desktop**: Layout completo com abas lado a lado
- **Tablet**: Layout adaptado com abas em coluna
- **Mobile**: Interface otimizada com ícones compactos

## 🔄 Atualização Automática

- **Monitor de Tráfego**: Atualiza a cada 3 segundos quando "Ao Vivo" está ativado
- **Logs**: Novos acessos aparecem no topo da lista
- **Estatísticas**: Atualizam em tempo real

## 💾 Backup de Dados

Para fazer backup dos seus dados:

1. Vá para "Monitorar Tráfego"
2. Clique em "Exportar"
3. Um arquivo JSON será baixado com todos os logs
4. Guarde em local seguro

## 🛠️ Troubleshooting

### Problema: Não consigo acessar o dashboard

**Solução**:
- Verifique se a URL está correta: `/dashboard/login`
- Limpe o cache do navegador
- Tente em outro navegador

### Problema: Esqueci a senha

**Solução**:
- A senha de demo é: `admin123`
- Para produção, implemente sistema de recuperação de senha

### Problema: Os logs desapareceram

**Solução**:
- Os dados estão em `localStorage`
- Se você limpou o cache, os dados foram apagados
- Sempre faça backup clicando em "Exportar"

### Problema: Dashboard está lento

**Solução**:
- Clique em "Limpar" para remover logs antigos
- Pause a atualização automática clicando em "Pausado"
- Feche outras abas do navegador

## 📞 Suporte

Para suporte técnico:
1. Verifique o console do navegador (F12)
2. Exporte os logs para análise
3. Abra uma issue no repositório

## 🔗 Links Úteis

- **Home**: `/`
- **Página Black**: `/black`
- **Página White**: `/white`
- **Dashboard Login**: `/dashboard/login`
- **Dashboard**: `/dashboard`
- **API Traffic Info**: `/api/traffic-info`
- **API Health**: `/api/health`

---

**Desenvolvido com ❤️ para Advanced Cloaker**
