# 📡 Plano de Integração com API Spring Boot

## Visão Geral

Este documento descreve o plano de integração do frontend React com a API Spring Boot (Java 17) que será desenvolvida em repositório separado para gerenciar dados de estados, cidades e bairros em risco de desastres naturais.

---

## 🎯 Objetivos

1. **Migrar dados mockados** do frontend para banco de dados PostgreSQL
2. **Criar API RESTful** com Spring Boot para servir os dados
3. **Implementar sistema de busca** eficiente
4. **Adicionar autenticação** para operações administrativas (Spring Security + JWT)
5. **Containerizar** com Docker para facilitar deploy e desenvolvimento
6. **Preparar para escalabilidade** e futuras features

---

## 📊 Estrutura de Dados Atual (Frontend)

### Estados
```javascript
{
    name: "São Paulo",
    flag: "/images/bandeira.png",
    description: "Descrição do estado...",
    mapCenter: [-23.5505, -46.6333],
    mapZoom: 12,
    riskAreas: [...],
    neighborhoods: [...],
    tragedies: {...}
}
```

### Bairros
```javascript
{
    name: "Vila Mariana",
    coordinates: [-23.5880, -46.6390],
    risk: "Enchentes",
    tips: ["Dica 1", "Dica 2", ...]
}
```

---

## 🗄️ Estrutura de Banco de Dados (Flyway Migrations)

### Tabela: `estados`
```sql
CREATE TABLE estados (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    sigla VARCHAR(2) NOT NULL UNIQUE,
    bandeira_url TEXT,
    descricao TEXT,
    mapa_centro_lat DECIMAL(10, 8),
    mapa_centro_lng DECIMAL(11, 8),
    mapa_zoom INTEGER DEFAULT 12,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Tabela: `bairros`
```sql
CREATE TABLE bairros (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    estado_id BIGINT NOT NULL REFERENCES estados(id) ON DELETE CASCADE,
    coordenada_lat DECIMAL(10, 8),
    coordenada_lng DECIMAL(11, 8),
    tipo_risco VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(nome, estado_id)
);
```

### Tabela: `dicas_prevencao`
```sql
CREATE TABLE dicas_prevencao (
    id BIGSERIAL PRIMARY KEY,
    bairro_id BIGINT NOT NULL REFERENCES bairros(id) ON DELETE CASCADE,
    dica TEXT NOT NULL,
    ordem INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Tabela: `areas_risco`
```sql
CREATE TABLE areas_risco (
    id BIGSERIAL PRIMARY KEY,
    estado_id BIGINT NOT NULL REFERENCES estados(id) ON DELETE CASCADE,
    descricao VARCHAR(200),
    cor VARCHAR(50),
    coordenadas JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Tabela: `tragedias`
```sql
CREATE TABLE tragedias (
    id BIGSERIAL PRIMARY KEY,
    estado_id BIGINT NOT NULL REFERENCES estados(id) ON DELETE CASCADE,
    tipo VARCHAR(100) NOT NULL,
    quantidade INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

---

## 🔌 Endpoints da API

### **Estados**

#### `GET /api/v1/estados`
Retorna lista de todos os estados.

**Response:**
```json
[
    {
        "id": 1,
        "nome": "São Paulo",
        "sigla": "SP",
        "bandeiraUrl": "/images/bandeira.png",
        "descricao": "Descrição...",
        "mapaCentro": {
            "lat": -23.5505,
            "lng": -46.6333
        },
        "mapaZoom": 12
    }
]
```

#### `GET /api/v1/estados/{id}`
Retorna detalhes completos de um estado específico.

**Response:**
```json
{
    "id": 1,
    "nome": "São Paulo",
    "sigla": "SP",
    "bandeiraUrl": "/images/bandeira.png",
    "descricao": "Descrição...",
    "mapaCentro": {
        "lat": -23.5505,
        "lng": -46.6333
    },
    "mapaZoom": 12,
    "areasRisco": [...],
    "bairros": [...],
    "tragedias": {...}
}
```

#### `GET /api/v1/estados/nome/{nome}`
Busca estado por nome (ex: "São Paulo", "SP").

---

### **Bairros**

#### `GET /api/v1/bairros`
Lista todos os bairros (com paginação via Spring Data `Pageable`).

**Query Params:**
- `estadoId` (opcional): Filtrar por estado
- `page` (default: 0)
- `size` (default: 50)
- `sort` (opcional): Campo de ordenação

**Response:**
```json
{
    "content": [
        {
            "id": 1,
            "nome": "Vila Mariana",
            "estado": {
                "id": 1,
                "nome": "São Paulo",
                "sigla": "SP"
            },
            "coordenadas": {
                "lat": -23.5880,
                "lng": -46.6390
            },
            "tipoRisco": "Enchentes",
            "dicas": ["Dica 1", "Dica 2"]
        }
    ],
    "totalElements": 100,
    "totalPages": 2,
    "number": 0,
    "size": 50
}
```

#### `GET /api/v1/bairros/{id}`
Detalhes de um bairro específico.

#### `GET /api/v1/bairros/nome/{nome}`
Busca bairro por nome.

---

### **Busca**

#### `GET /api/v1/busca`
Busca unificada por estados e bairros.

**Query Params:**
- `q` (required): Termo de busca
- `tipo` (opcional): "estado" | "bairro" | "all" (default: "all")

**Response:**
```json
{
    "estados": [
        {
            "id": 1,
            "nome": "São Paulo",
            "sigla": "SP",
            "tipo": "estado"
        }
    ],
    "bairros": [
        {
            "id": 5,
            "nome": "Leblon",
            "estado": "Rio de Janeiro",
            "tipo": "bairro"
        }
    ]
}
```

---

## 🔐 Autenticação (Spring Security + JWT)

### Endpoints Administrativos (Protegidos com `ROLE_ADMIN`)

- `POST /api/v1/admin/estados` - Criar estado
- `PUT /api/v1/admin/estados/{id}` - Atualizar estado
- `DELETE /api/v1/admin/estados/{id}` - Deletar estado
- `POST /api/v1/admin/bairros` - Criar bairro
- `PUT /api/v1/admin/bairros/{id}` - Atualizar bairro
- `DELETE /api/v1/admin/bairros/{id}` - Deletar bairro

**Autenticação:** JWT Bearer Token via `Authorization: Bearer <token>`

---

## 🔄 Migração do Frontend

### Mudanças Necessárias

#### 1. **Criar Service Layer**

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const estadosService = {
    getAll: () => api.get('/estados'),
    getByName: (nome) => api.get(`/estados/nome/${encodeURIComponent(nome)}`),
    getById: (id) => api.get(`/estados/${id}`),
};

export const bairrosService = {
    getAll: (params) => api.get('/bairros', { params }),
    getByName: (nome) => api.get(`/bairros/nome/${encodeURIComponent(nome)}`),
    getById: (id) => api.get(`/bairros/${id}`),
};

export const buscaService = {
    search: (query, tipo = 'all') => api.get('/busca', { params: { q: query, tipo } }),
};

export default api;
```

#### 2. **Atualizar Componente Header**

```javascript
// src/components/Header/index.jsx
import { useState, useEffect } from 'react';
import { buscaService } from '../../services/api';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState({ estados: [], bairros: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim().length < 2) {
                setSuggestions({ estados: [], bairros: [] });
                return;
            }

            setLoading(true);
            try {
                const response = await buscaService.search(searchTerm);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Erro ao buscar sugestões:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    // ... resto do componente
}
```

#### 3. **Atualizar Página Results**

```javascript
// src/pages/Results/index.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { estadosService } from '../../services/api';

function Results() {
    const { city } = useParams();
    const [cityInfo, setCityInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCityData = async () => {
            setLoading(true);
            try {
                const response = await estadosService.getByName(city);
                setCityInfo(response.data);
            } catch (err) {
                setError('Erro ao carregar dados da cidade');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCityData();
    }, [city]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;
    if (!cityInfo) return <div>Cidade não encontrada</div>;

    // ... resto do componente
}
```

---

## 📦 Dependências Necessárias

### Frontend
```json
{
    "dependencies": {
        "axios": "^1.6.0",
        "@tanstack/react-query": "^5.0.0"
    }
}
```

### Backend (pom.xml — principais)
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<properties>
    <java.version>17</java.version>
</properties>

<dependencies>
    <!-- Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- JPA + PostgreSQL -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Flyway -->
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
    </dependency>

    <!-- Segurança + JWT -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>

    <!-- Validação -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Cache Redis -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>

    <!-- Documentação -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- Testes -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

## 🚀 Plano de Implementação

### Fase 1: Setup Backend (Semana 1-2)
- [ ] Criar projeto Spring Boot via Spring Initializr (Java 17, Maven)
- [ ] Configurar `docker-compose.yml` (PostgreSQL + Redis)
- [ ] Criar JPA Entities (Estado, Bairro, DicaPrevencao, AreaRisco, Tragedia)
- [ ] Configurar Flyway e criar migrations iniciais
- [ ] Popular banco com dados mockados via `data.sql` ou `CommandLineRunner`

### Fase 2: Endpoints Básicos (Semana 3-4)
- [ ] Criar Repositories (Spring Data JPA)
- [ ] Criar Services com lógica de negócio
- [ ] Criar Controllers REST (CRUD estados, bairros)
- [ ] Implementar endpoint de busca unificada
- [ ] Adicionar validação com `@Valid` e Bean Validation
- [ ] Configurar SpringDoc (Swagger UI em `/swagger-ui.html`)

### Fase 3: Integração Frontend (Semana 5-6)
- [ ] Criar service layer no frontend (Axios)
- [ ] Migrar Header para usar API
- [ ] Migrar Results para usar API
- [ ] Adicionar loading states
- [ ] Implementar error handling

### Fase 4: Otimização (Semana 7-8)
- [ ] Adicionar cache com Spring Data Redis (`@Cacheable`)
- [ ] Implementar paginação com `Pageable`
- [ ] Otimizar queries (N+1, `@EntityGraph`, projections)
- [ ] Adicionar rate limiting (Bucket4j ou similar)
- [ ] Configurar logging estruturado (Logback)

### Fase 5: Autenticação (Semana 9-10)
- [ ] Implementar Spring Security + JWT (jjwt)
- [ ] Criar endpoints admin protegidos (`ROLE_ADMIN`)
- [ ] Criar `JwtAuthenticationFilter`
- [ ] Configurar `SecurityFilterChain`

---

## 🔧 Configurações

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_API_TIMEOUT=10000
```

### Backend (application.yml)
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/prevent_db
    username: prevent_user
    password: prevent_pass
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        format_sql: true
  flyway:
    enabled: true
  data:
    redis:
      host: localhost
      port: 6379

app:
  jwt:
    secret: ${JWT_SECRET:your-secret-key-here}
    expiration-ms: 3600000
  cors:
    allowed-origins: http://localhost:5173,http://localhost:3000
```

### Docker Compose (desenvolvimento)
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: prevent_db
      POSTGRES_USER: prevent_user
      POSTGRES_PASSWORD: prevent_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

---

## 📝 Notas Importantes

1. **Normalização de Busca:** Implementar busca case-insensitive usando `ILIKE` no PostgreSQL ou `@Query` customizada
2. **Cache:** Usar `@Cacheable` do Spring Data Redis para cachear resultados frequentes
3. **Imagens:** Considerar usar CDN para servir imagens das bandeiras
4. **Backup:** Implementar rotina de backup automático do banco de dados
5. **Monitoramento:** Spring Boot Actuator + Micrometer + Prometheus/Grafana
6. **Testes:** JUnit 5 + Mockito para unitários, `@SpringBootTest` + `MockMvc` para integração
7. **Backend em repositório separado:** O código-fonte do backend ficará em outro repositório; esta documentação permanece aqui até a migração

---

## 🎓 Recursos de Aprendizado

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/)
- [SpringDoc OpenAPI](https://springdoc.org/)
- [Flyway Documentation](https://documentation.red-gate.com/flyway)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Query Documentation](https://tanstack.com/query/latest)

---

**Última atualização:** Março 2026
**Autor:** Equipe Prevent
**Status:** 📋 Planejamento
