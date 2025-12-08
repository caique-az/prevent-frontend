# 📋 Plano de Desenvolvimento - Prevent

> Sistema multiplataforma de monitoramento de desastres naturais

## 🏗️ Arquitetura do Sistema

```
Prevent/
├── frontend/          # React Web App (Vite + Bootstrap)
├── mobile/            # React Native App (TailwindCSS) [A CRIAR]
└── backend/           # FastAPI (Python Async) [A CRIAR]
```

---

## 🎯 FASE 1: Correções Críticas do Frontend (Sprint 1-2 semanas)

### 🔴 Prioridade Alta (Crítico)

- [x] **Corrigir caminhos de imagens** ✅
  - Alterar `/public/images/` para `/images/` em todos os arquivos
  - Arquivos afetados: `Results/index.jsx`, `App.css`
  - Motivo: Vite não resolve corretamente caminhos com `/public/`

- [x] **Implementar funcionalidade de busca** ✅
  - Adicionar lógica de busca no componente `Header`
  - Permitir busca por cidade/bairro
  - Redirecionar para página de resultados com os dados filtrados
  - Adicionado sugestões com animação de entrada/saída
  - Busca por estados e bairros com categorização

- [ ] **Corrigir inconsistência de rotas**
  - Padronizar rotas em lowercase: `/projects` e `/configurations`
  - Atualizar links no `Header/index.jsx` (linhas 33 e 36)
  - Garantir consistência entre definição de rotas e navegação

- [ ] **Criar arquivo de dados separado**
  - Mover dados hardcoded de `Results/index.jsx` para `src/data/cityData.js`
  - Mover dados de `Historico/index.jsx` para `src/data/historicoData.js`
  - Facilitar manutenção e possível integração com API

- [ ] **Tornar o mapa dinâmico**
  - Passar coordenadas como props para `Map/index.jsx`
  - Criar dados de coordenadas para cada estado
  - Atualizar mapa baseado no estado/cidade selecionado

### 🟡 Prioridade Média (Importante)

- [x] **Implementar persistência de configurações** ✅
  - Salvar dados do formulário em `localStorage`
  - Carregar configurações salvas ao abrir a página
  - Feedback visual ao salvar (botão muda para "Salvo com Sucesso!")

- [x] **Adicionar loading states** ✅
  - Criado componente Loading reutilizável
  - Suporte a tamanhos (small, medium, large)
  - Suporte a fullscreen
  - Skeleton loading para cards

- [x] **Adicionar tratamento de erros** ✅
  - Implementado ErrorBoundary global
  - Criada página 404 (NotFound)
  - Criada página de Contato
  - Validação de formulários com feedback visual

- [ ] **Integrar com API real**
  - Pesquisar APIs de dados meteorológicos (INMET, CEMADEN)
  - Implementar camada de serviços para requisições
  - Substituir dados mockados por dados reais

- [x] **Completar seção pitch na Home** ✅
  - Seção removida e substituída por layout moderno
  - Hero Section com CTAs e estatísticas
  - Seção de Features (tipos de riscos)
  - Seção "Como Funciona" com passos
  - Seção de Estados com cards visuais
  - Seção Sobre o Projeto
  - Footer completo com newsletter

- [x] **Decidir sobre componente Graphic** ✅
  - Componente removido (não estava sendo utilizado)
  - Código morto eliminado do projeto

### 🟢 Prioridade Baixa (Melhorias)

- [ ] **Adicionar testes automatizados**
  - Instalar Jest e React Testing Library
  - Criar testes unitários para componentes
  - Criar testes de integração para páginas
  - Configurar CI/CD com testes

- [ ] **Migrar para TypeScript**
  - Instalar dependências do TypeScript
  - Criar interfaces para dados (Estados, Cidades, Alertas)
  - Converter componentes gradualmente
  - Adicionar type safety ao projeto

- [ ] **Adicionar Prettier**
  - Instalar e configurar Prettier
  - Criar `.prettierrc` com regras do projeto
  - Adicionar script `format` no `package.json`
  - Integrar com ESLint

- [ ] **Melhorar documentação técnica**
  - Adicionar comentários JSDoc nos componentes
  - Criar guia de contribuição (CONTRIBUTING.md)
  - Documentar estrutura de dados
  - Adicionar exemplos de uso

- [ ] **Implementar dark mode**
  - Criar contexto de tema
  - Adicionar variáveis CSS para temas
  - Conectar com opção nas configurações
  - Persistir preferência do usuário

- [ ] **Otimizações de performance**
  - Implementar lazy loading de rotas
  - Otimizar imagens (WebP, compressão)
  - Adicionar memoização onde necessário
  - Implementar code splitting

- [ ] **Melhorias de acessibilidade**
  - Adicionar labels ARIA
  - Garantir navegação por teclado
  - Melhorar contraste de cores
  - Testar com leitores de tela

- [ ] **Refatoração de código**
  - Padronizar nomenclatura (português ou inglês)
  - Remover CSS duplicado
  - Extrair constantes e magic numbers
  - Melhorar organização de imports

---

## ⚡ FASE 2: Backend FastAPI (Sprint 3-6 semanas)

### Estrutura do Backend

```
backend/
├── main.py              # Entry point FastAPI
├── requirements.txt
├── .env.example
├── alembic/             # Migrações de banco
│   └── versions/
├── app/
│   ├── __init__.py
│   ├── core/            # Configurações, segurança, deps
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── models/          # SQLAlchemy models
│   │   ├── user.py
│   │   ├── location.py
│   │   ├── disaster.py
│   │   ├── alert.py
│   │   └── notification.py
│   ├── schemas/         # Pydantic schemas
│   │   ├── user.py
│   │   ├── location.py
│   │   ├── disaster.py
│   │   └── alert.py
│   ├── api/             # Rotas da API
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   ├── locations.py
│   │   │   │   ├── disasters.py
│   │   │   │   ├── alerts.py
│   │   │   │   └── notifications.py
│   │   │   └── api.py
│   │   └── deps.py      # Dependências
│   ├── services/        # Lógica de negócio
│   │   ├── auth.py
│   │   ├── disaster.py
│   │   ├── alert.py
│   │   └── notification.py
│   ├── external/        # APIs externas
│   │   ├── inmet.py
│   │   ├── cemaden.py
│   │   └── inpe.py
│   └── utils/           # Funções utilitárias
└── tests/               # Testes automatizados
```

### 🔴 Backend - Prioridade Alta

- [ ] **Setup inicial do projeto FastAPI**
  - Criar estrutura de pastas `/backend`
  - Configurar FastAPI com SQLAlchemy (async)
  - Configurar PostgreSQL com asyncpg
  - Setup de variáveis de ambiente (pydantic-settings)
  - Configurar CORS para comunicação com frontend
  - Configurar Alembic para migrações

- [ ] **Módulo `locations` - Localidades**
  - Models (SQLAlchemy): Estado, Cidade, Bairro, AreaDeRisco
  - Schemas (Pydantic): validação de entrada/saída
  - Routers com filtros e paginação
  - Endpoints: `/api/v1/estados/`, `/api/v1/cidades/`, `/api/v1/bairros/`
  - Popular banco com dados dos 27 estados brasileiros

- [ ] **Módulo `disasters` - Desastres**
  - Models (SQLAlchemy): TipoDesastre, Desastre, HistoricoDesastre
  - Schemas (Pydantic) com validações
  - Endpoints: `/api/v1/desastres/`, `/api/v1/historico/`
  - Sistema de categorização (enchente, deslizamento, incêndio, etc.)

- [ ] **Módulo `alerts` - Alertas**
  - Models (SQLAlchemy): Alerta, NivelRisco
  - Sistema de priorização de alertas
  - Endpoints: `/api/v1/alertas/`, `/api/v1/alertas/ativos/`
  - Filtros por localização e tipo

- [ ] **Integração com APIs externas**
  - INMET (meteorologia)
  - CEMADEN (alertas de desastres)
  - INPE (queimadas)
  - Usar httpx async para requisições
  - Background tasks com FastAPI BackgroundTasks
  - Sistema de cache com Redis

- [ ] **Documentação da API**
  - Swagger UI automático do FastAPI
  - ReDoc automático
  - Documentar schemas Pydantic
  - Exemplos de requisições e respostas
  - Versionamento da API (v1)

### 🟡 Backend - Prioridade Média

- [ ] **Módulo `users` - Autenticação**
  - JWT com python-jose
  - OAuth2 com Password Flow
  - Models: User, UserProfile, UserPreferences
  - Endpoints: `/api/v1/auth/register/`, `/api/v1/auth/login/`
  - Sistema de permissões com dependencies

- [ ] **Módulo `notifications` - Notificações**
  - Models: Notification, NotificationPreference
  - Integração com Firebase Cloud Messaging (async)
  - Sistema de templates de notificação
  - Endpoints: `/api/v1/notificacoes/`
  - Background tasks para envio assíncrono

- [ ] **Sistema de busca avançada**
  - Elasticsearch ou PostgreSQL Full-Text Search
  - Busca por cidade, bairro, tipo de desastre
  - Autocomplete para busca

- [ ] **Testes automatizados**
  - Testes com pytest + pytest-asyncio
  - TestClient do FastAPI
  - Testes de integração
  - Coverage mínimo de 80%
  - CI/CD com GitHub Actions

### 🟢 Backend - Prioridade Baixa

- [ ] **Sistema de relatórios**
  - Geração de PDFs com dados estatísticos
  - Exportação de dados (CSV, JSON)
  - Dashboard administrativo customizado

- [ ] **Sistema de denúncias/relatos**
  - Usuários podem reportar situações
  - Moderação de conteúdo
  - Validação de informações

- [ ] **WebSockets para alertas em tempo real**
  - WebSockets nativos do FastAPI
  - Notificações push instantâneas
  - Status de conexão
  - Broadcast de alertas

---

## 📱 FASE 3: Mobile React Native (Sprint 7-10 semanas)

### Estrutura do Mobile

```
mobile/
├── App.tsx
├── package.json
├── tailwind.config.js
├── src/
│   ├── screens/         # Telas do app
│   ├── components/      # Componentes reutilizáveis
│   ├── navigation/      # React Navigation
│   ├── services/        # API calls
│   ├── hooks/           # Custom hooks
│   ├── store/           # State management (Zustand/Redux)
│   ├── utils/           # Funções utilitárias
│   └── types/           # TypeScript types
├── android/
└── ios/
```

### 🔴 Mobile - Prioridade Alta

- [ ] **Setup inicial React Native**
  - Criar projeto com Expo ou React Native CLI
  - Configurar TypeScript
  - Configurar NativeWind (TailwindCSS para RN)
  - Setup de navegação (React Navigation)

- [ ] **Telas principais**
  - Home com lista de estados
  - Detalhes de estado/cidade
  - Mapa interativo (react-native-maps)
  - Histórico de desastres
  - Perfil e configurações

- [ ] **Integração com backend**
  - Configurar Axios/Fetch
  - Gerenciamento de estado (Zustand ou Redux Toolkit)
  - Cache de dados (React Query)
  - Tratamento de erros

- [ ] **Autenticação**
  - Login/Registro
  - Armazenamento seguro de tokens (AsyncStorage + Keychain)
  - Refresh token automático

- [ ] **Sistema de notificações push**
  - Firebase Cloud Messaging
  - Permissões de notificação
  - Deep linking para alertas

### 🟡 Mobile - Prioridade Média

- [ ] **Geolocalização**
  - Detectar localização do usuário
  - Alertas baseados em proximidade
  - Permissões de localização

- [ ] **Modo offline**
  - Cache de dados essenciais
  - Sincronização ao reconectar
  - Indicador de status de conexão

- [ ] **Compartilhamento**
  - Compartilhar alertas via redes sociais
  - Share de mapas e estatísticas

### 🟢 Mobile - Prioridade Baixa

- [ ] **Testes automatizados**
  - Jest + React Native Testing Library
  - Testes E2E com Detox

- [ ] **Otimizações**
  - Code splitting
  - Lazy loading de imagens
  - Performance monitoring

- [ ] **Acessibilidade**
  - Screen readers
  - Navegação por voz
  - Contraste e tamanho de fonte

---

## 🔄 FASE 4: Integração e Deploy (Sprint 11-12 semanas)

### Frontend Web

- [ ] **Integrar com backend FastAPI**
  - Substituir dados mockados por API calls
  - Implementar autenticação JWT
  - Gerenciamento de estado global (Context API ou Zustand)
  - Tratamento de erros e loading states

- [ ] **Deploy frontend**
  - Vercel ou Netlify
  - Configurar variáveis de ambiente
  - CI/CD automatizado
  - CDN para assets

### Backend

- [ ] **Deploy backend**
  - Railway, Render, ou AWS/GCP
  - PostgreSQL em produção
  - Redis para cache
  - Uvicorn com workers
  - Configurar domínio e SSL

- [ ] **Monitoramento**
  - Sentry para error tracking
  - Logs estruturados
  - Métricas de performance
  - Uptime monitoring

### Mobile

- [ ] **Deploy mobile**
  - Google Play Store (Android)
  - Apple App Store (iOS)
  - Configurar versioning
  - Sistema de updates OTA (Expo)

---

## 📊 Estimativas de Tempo

| Fase | Duração | Descrição |
|------|---------|-----------|
| **Fase 1** | 2 semanas | Correções críticas do frontend |
| **Fase 2** | 4 semanas | Backend Django completo |
| **Fase 3** | 4 semanas | Mobile React Native |
| **Fase 4** | 2 semanas | Integração e deploy |
| **Total** | **12 semanas** | ~3 meses para MVP completo |

---

## 🛠️ Stack Tecnológica Completa

### Frontend Web
- React 19 + Vite
- React Router DOM
- Bootstrap 5 + Styled Components
- Leaflet (mapas)
- Chart.js + Recharts
- Axios
- Zustand (state management)

### Mobile
- React Native + Expo
- TypeScript
- NativeWind (TailwindCSS)
- React Navigation
- React Native Maps
- Zustand
- React Query

### Backend
- Python 3.11+
- FastAPI 0.104+
- SQLAlchemy 2.0 (async)
- PostgreSQL + asyncpg
- Redis (cache)
- Pydantic v2
- JWT Authentication (python-jose)
- Swagger/OpenAPI (automático)

### DevOps
- Git + GitHub
- GitHub Actions (CI/CD)
- Docker + Docker Compose
- Vercel/Netlify (frontend)
- Railway/Render (backend)
- Sentry (monitoring)

---

## 💰 Estimativa de Custos Mensais

| Serviço | Tier Gratuito | Tier Pago |
|---------|---------------|------------|
| **Frontend (Vercel)** | ✅ Ilimitado | - |
| **Backend (Railway)** | $5 crédito | $10-30/mês |
| **PostgreSQL (Supabase)** | ✅ 500MB | $25/mês |
| **Redis (Upstash)** | ✅ 10k req/dia | $10/mês |
| **Firebase (notificações)** | ✅ Generoso | $25/mês |
| **Domínio** | - | R$40-80/ano |
| **APIs Externas** | ✅ Tier gratuito | Variável |
| **Total Inicial** | **~$5/mês** | - |
| **Total Produção** | - | **$70-100/mês** |

---

## 📝 Notas Adicionais

### Dados Mockados Atuais
- Estados: São Paulo, Rio de Janeiro, Minas Gerais
- Bairros de risco: 6 por estado
- Histórico: 3 eventos por estado

### APIs Sugeridas para Integração
- **INMET** (Instituto Nacional de Meteorologia)
- **CEMADEN** (Centro Nacional de Monitoramento e Alertas de Desastres Naturais)
- **IBGE** (Dados geográficos)
- **OpenWeatherMap** (Dados meteorológicos)

### Melhorias de UX Sugeridas
- Adicionar animações de transição entre páginas
- Implementar skeleton loading
- Adicionar tooltips explicativos
- Melhorar feedback visual em ações do usuário
- Adicionar breadcrumbs para navegação

---

---

## 🎯 Próximos Passos Imediatos

1. ✅ Revisar e aprovar este plano
2. 🔄 Executar correções críticas do frontend (Fase 1)
3. ⚡ Iniciar estrutura do backend FastAPI
4. 📱 Planejar arquitetura do mobile
5. 🔄 Configurar repositório com estrutura de monorepo

---

**Última atualização:** 07/12/2025  
**Versão do projeto:** 0.0.0  
**Status:** Em desenvolvimento ativo
