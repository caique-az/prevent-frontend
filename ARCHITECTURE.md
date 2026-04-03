# 🏗️ Arquitetura do Sistema Prevent

## 📋 Visão Geral

O Prevent é um sistema de monitoramento de desastres naturais composto por três camadas principais:

```
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                │
├──────────────────────────┬──────────────────────────────┤
│   Frontend Web (React)   │   Mobile (futuro)            │
│   - Vite + Bootstrap     │   - React Native             │
│   - Leaflet Maps         │   - Push Notifications       │
│   - Chart.js             │                              │
└──────────────────────────┴──────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE API                         │
│              Spring Boot 3.x (Java 21)                   │
│   - Spring Security + JWT                                │
│   - Swagger/OpenAPI (springdoc-openapi)                  │
│   - CORS configurado                                     │
│   - @Scheduled (jobs de integração)                      │
└─────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  CAMADA DE NEGÓCIO                       │
│              Services & Business Logic                   │
│   ┌─────────┬──────────┬─────────┬──────────────────┐  │
│   │ Auth    │ Locations│ Disasters│ Alerts & Notif.  │  │
│   └─────────┴──────────┴─────────┴──────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  CAMADA DE DADOS                         │
│   ┌──────────────┬──────────────┬──────────────────┐   │
│   │  PostgreSQL  │    Redis     │  APIs Externas   │   │
│   │  (HikariCP)  │   (Cache)    │  (WebClient)     │   │
│   └──────────────┴──────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## ⚡ Backend Spring Boot — Estrutura Detalhada

### Estrutura de Diretórios

```
prevent-api/
├── pom.xml
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── README.md
│
└── src/
    ├── main/
    │   ├── java/com/prevent/api/
    │   │   ├── PreventApplication.java            # Entry point (@SpringBootApplication)
    │   │   │
    │   │   ├── config/                            # Configurações gerais
    │   │   │   ├── SecurityConfig.java            # Spring Security + JWT filter chain
    │   │   │   ├── CorsConfig.java                # CORS policy
    │   │   │   ├── RedisConfig.java               # Cache manager (Redis)
    │   │   │   ├── WebClientConfig.java           # WebClient beans para APIs externas
    │   │   │   └── OpenApiConfig.java             # Swagger/springdoc
    │   │   │
    │   │   ├── domain/
    │   │   │   ├── model/                         # Entidades JPA
    │   │   │   │   ├── BaseEntity.java            # @MappedSuperclass (id, createdAt, updatedAt)
    │   │   │   │   ├── Estado.java
    │   │   │   │   ├── Cidade.java
    │   │   │   │   ├── Bairro.java
    │   │   │   │   ├── AreaDeRisco.java
    │   │   │   │   ├── TipoDesastre.java
    │   │   │   │   ├── Desastre.java
    │   │   │   │   ├── HistoricoDesastre.java
    │   │   │   │   ├── Alerta.java
    │   │   │   │   ├── AlertaUsuario.java
    │   │   │   │   ├── Usuario.java
    │   │   │   │   ├── UsuarioPerfil.java
    │   │   │   │   └── UsuarioPreferencias.java
    │   │   │   │
    │   │   │   ├── repository/                    # Interfaces JpaRepository
    │   │   │   │   ├── EstadoRepository.java
    │   │   │   │   ├── CidadeRepository.java
    │   │   │   │   ├── BairroRepository.java
    │   │   │   │   ├── AreaDeRiscoRepository.java
    │   │   │   │   ├── DesastreRepository.java
    │   │   │   │   ├── AlertaRepository.java
    │   │   │   │   └── UsuarioRepository.java
    │   │   │   │
    │   │   │   └── enums/                         # Enums de domínio
    │   │   │       ├── TipoDesastreEnum.java      # ENCHENTE, DESLIZAMENTO, INCENDIO...
    │   │   │       ├── NivelRisco.java            # BAIXO, MEDIO, ALTO, CRITICO
    │   │   │       ├── StatusDesastre.java         # ATIVO, CONTROLADO, FINALIZADO
    │   │   │       └── FonteDados.java            # OPENWEATHER, GDACS, INMET
    │   │   │
    │   │   ├── dto/                               # Data Transfer Objects
    │   │   │   ├── request/                       # Payloads de entrada
    │   │   │   │   ├── LoginRequest.java
    │   │   │   │   ├── RegisterRequest.java
    │   │   │   │   └── PreferenciasRequest.java
    │   │   │   └── response/                      # Payloads de saída
    │   │   │       ├── TokenResponse.java
    │   │   │       ├── EstadoResponse.java
    │   │   │       ├── CidadeResponse.java
    │   │   │       ├── DesastreResponse.java
    │   │   │       ├── AlertaResponse.java
    │   │   │       ├── WeatherResponse.java
    │   │   │       └── EstatisticasResponse.java
    │   │   │
    │   │   ├── controller/                        # REST Controllers
    │   │   │   ├── AuthController.java
    │   │   │   ├── UsuarioController.java
    │   │   │   ├── EstadoController.java
    │   │   │   ├── CidadeController.java
    │   │   │   ├── DesastreController.java
    │   │   │   ├── AlertaController.java
    │   │   │   └── WeatherController.java
    │   │   │
    │   │   ├── service/                           # Business logic
    │   │   │   ├── AuthService.java
    │   │   │   ├── UsuarioService.java
    │   │   │   ├── LocationService.java
    │   │   │   ├── DesastreService.java
    │   │   │   ├── AlertaService.java
    │   │   │   └── WeatherService.java
    │   │   │
    │   │   ├── integration/                       # Clientes de APIs externas
    │   │   │   ├── openweather/
    │   │   │   │   ├── OpenWeatherClient.java     # WebClient → One Call API 3.0
    │   │   │   │   └── OpenWeatherMapper.java     # JSON externo → DTOs internos
    │   │   │   ├── gdacs/
    │   │   │   │   ├── GdacsClient.java           # WebClient → GDACS REST
    │   │   │   │   └── GdacsMapper.java
    │   │   │   └── inmet/
    │   │   │       ├── InmetClient.java           # WebClient → apitempo.inmet.gov.br
    │   │   │       └── InmetMapper.java
    │   │   │
    │   │   ├── scheduler/                         # Jobs agendados
    │   │   │   ├── GdacsSyncScheduler.java        # @Scheduled — polling GDACS
    │   │   │   ├── InmetSyncScheduler.java        # @Scheduled — polling INMET
    │   │   │   └── AlertCleanupScheduler.java     # Expiração de alertas antigos
    │   │   │
    │   │   ├── security/                          # Camada de segurança
    │   │   │   ├── JwtTokenProvider.java          # Geração e validação de tokens
    │   │   │   ├── JwtAuthenticationFilter.java   # OncePerRequestFilter
    │   │   │   └── CustomUserDetailsService.java  # Carrega usuário do banco
    │   │   │
    │   │   └── exception/                         # Tratamento de erros
    │   │       ├── GlobalExceptionHandler.java    # @ControllerAdvice
    │   │       ├── ResourceNotFoundException.java
    │   │       ├── BadRequestException.java
    │   │       └── ApiErrorResponse.java          # Corpo padronizado de erro
    │   │
    │   └── resources/
    │       ├── application.yml                    # Configuração principal
    │       ├── application-dev.yml                # Profile de desenvolvimento
    │       ├── application-prod.yml               # Profile de produção
    │       └── db/migration/                      # Flyway migrations (opcional)
    │           └── V1__create_tables.sql
    │
    └── test/
        └── java/com/prevent/api/
            ├── controller/
            │   ├── AuthControllerTest.java
            │   ├── EstadoControllerTest.java
            │   └── DesastreControllerTest.java
            ├── service/
            │   ├── WeatherServiceTest.java
            │   └── DesastreServiceTest.java
            └── integration/
                ├── OpenWeatherClientTest.java
                └── GdacsClientTest.java
```

---

## 📊 Modelos de Dados (Entidades JPA)

### BaseEntity

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

### Localidades

```java
@Entity
@Table(name = "estados")
public class Estado extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(length = 2, unique = true, nullable = false)
    private String sigla;

    @Column(name = "codigo_ibge", length = 2, unique = true, nullable = false)
    private String codigoIbge;

    @Column(length = 20, nullable = false)
    private String regiao;  // Norte, Sul, Sudeste...

    private Integer populacao;

    @Column(name = "area_km2", precision = 12, scale = 2)
    private BigDecimal areaKm2;

    @OneToMany(mappedBy = "estado", cascade = CascadeType.ALL)
    private List<Cidade> cidades;
}

@Entity
@Table(name = "cidades")
public class Cidade extends BaseEntity {

    @Column(length = 200, nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @Column(name = "codigo_ibge", length = 7, unique = true, nullable = false)
    private String codigoIbge;

    @Column(precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;

    private Integer populacao;

    @OneToMany(mappedBy = "cidade", cascade = CascadeType.ALL)
    private List<Bairro> bairros;
}

@Entity
@Table(name = "bairros")
public class Bairro extends BaseEntity {

    @Column(length = 200, nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cidade_id", nullable = false)
    private Cidade cidade;

    @Column(precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;

    @OneToMany(mappedBy = "bairro", cascade = CascadeType.ALL)
    private List<AreaDeRisco> areasDeRisco;
}

@Entity
@Table(name = "areas_de_risco")
public class AreaDeRisco extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bairro_id", nullable = false)
    private Bairro bairro;

    @Column(name = "tipo_risco", length = 50, nullable = false)
    private String tipoRisco;  // enchente, deslizamento, incendio

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_risco", length = 20, nullable = false)
    private NivelRisco nivelRisco;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "coordenadas_poligono", columnDefinition = "jsonb")
    private String coordenadasPoligono;  // GeoJSON

    @Column(nullable = false)
    private Boolean ativo = true;
}
```

### Desastres

```java
@Entity
@Table(name = "tipos_desastre")
public class TipoDesastre extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String nome;  // Enchente, Deslizamento, etc.

    @Column(length = 20, unique = true, nullable = false)
    private String codigo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "cor_hex", length = 7)
    private String corHex;

    @Column(length = 50)
    private String icone;
}

@Entity
@Table(name = "desastres")
public class Desastre extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_id", nullable = false)
    private TipoDesastre tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cidade_id", nullable = false)
    private Cidade cidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bairro_id")
    private Bairro bairro;

    @Column(length = 200, nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "data_ocorrencia", nullable = false)
    private LocalDateTime dataOcorrencia;

    @Column(name = "data_fim")
    private LocalDateTime dataFim;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private NivelRisco gravidade;

    @Column(nullable = false)
    private Integer vitimas = 0;

    @Column(nullable = false)
    private Integer desabrigados = 0;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StatusDesastre status;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private FonteDados fonte;
}

@Entity
@Table(name = "historico_desastres")
public class HistoricoDesastre extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "desastre_id", nullable = false)
    private Desastre desastre;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_anterior", length = 20)
    private StatusDesastre statusAnterior;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_novo", length = 20, nullable = false)
    private StatusDesastre statusNovo;

    @Column(columnDefinition = "TEXT")
    private String observacoes;
}
```

### Alertas

```java
@Entity
@Table(name = "alertas")
public class Alerta extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_desastre_id", nullable = false)
    private TipoDesastre tipoDesastre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cidade_id", nullable = false)
    private Cidade cidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bairro_id")
    private Bairro bairro;

    @Column(length = 200, nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String mensagem;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_urgencia", length = 20, nullable = false)
    private NivelRisco nivelUrgencia;

    @Column(name = "data_inicio", nullable = false)
    private LocalDateTime dataInicio;

    @Column(name = "data_fim")
    private LocalDateTime dataFim;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private FonteDados fonte;
}

@Entity
@Table(name = "alertas_usuarios")
public class AlertaUsuario extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alerta_id", nullable = false)
    private Alerta alerta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Boolean visualizado = false;

    @Column(name = "data_visualizacao")
    private LocalDateTime dataVisualizacao;

    @Column(nullable = false)
    private Boolean notificado = false;
}
```

### Usuários

```java
@Entity
@Table(name = "usuarios")
public class Usuario extends BaseEntity {

    @Column(length = 150, nullable = false)
    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;  // BCrypt hash

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(length = 20, nullable = false)
    private String role = "USER";  // USER, ADMIN

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private UsuarioPerfil perfil;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private UsuarioPreferencias preferencias;
}

@Entity
@Table(name = "usuarios_perfil")
public class UsuarioPerfil extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @Column(length = 20)
    private String telefone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bairro_id")
    private Bairro bairro;
}

@Entity
@Table(name = "usuarios_preferencias")
public class UsuarioPreferencias extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @Column(name = "notificacoes_push", nullable = false)
    private Boolean notificacoesPush = true;

    @Column(name = "notificacoes_email", nullable = false)
    private Boolean notificacoesEmail = true;

    @Column(name = "raio_alerta_km", nullable = false)
    private Integer raioAlertaKm = 50;

    @Column(length = 20, nullable = false)
    private String tema = "claro";  // claro, escuro, sistema

    @Column(length = 20, nullable = false)
    private String regiao = "sudeste";
}
```

---

## 🔌 Endpoints da API

### Base URL: `/api/v1`

#### **Autenticação** (`/api/v1/auth`)
```
POST   /auth/register            # Registro de novo usuário
POST   /auth/login               # Login (retorna JWT access + refresh)
POST   /auth/refresh             # Refresh token
GET    /auth/me                  # Dados do usuário logado
PUT    /auth/me                  # Atualizar perfil
```

#### **Localidades** (`/api/v1`)
```
GET    /estados                  # Lista todos os estados
GET    /estados/{id}             # Detalhes de um estado
GET    /estados/{id}/cidades     # Cidades de um estado

GET    /cidades                  # Lista cidades (com filtros)
GET    /cidades/{id}             # Detalhes de uma cidade
GET    /cidades/{id}/bairros     # Bairros de uma cidade
GET    /cidades/buscar?q=        # Busca por nome

GET    /bairros/{id}             # Detalhes de um bairro
GET    /bairros/{id}/areas-risco # Áreas de risco do bairro
```

#### **Clima** (`/api/v1/weather`)
```
GET    /weather?lat=&lon=        # Clima atual + alertas (OpenWeather)
GET    /weather/forecast?lat=&lon=  # Previsão horária/diária
```

#### **Desastres** (`/api/v1/desastres`)
```
GET    /desastres                # Lista desastres (filtros: cidade, tipo, data, status)
GET    /desastres/{id}           # Detalhes de um desastre
GET    /desastres/ativos         # Desastres ativos
GET    /desastres/historico      # Histórico consolidado
GET    /desastres/estatisticas   # Estatísticas por tipo/região
GET    /desastres/tipos          # Lista tipos de desastre
```

#### **Alertas** (`/api/v1/alertas`)
```
GET    /alertas                  # Lista alertas (filtros: cidade, ativo)
GET    /alertas/{id}             # Detalhes de um alerta
GET    /alertas/ativos           # Alertas ativos
GET    /alertas/meus             # Alertas do usuário logado (autenticado)
PUT    /alertas/{id}/visualizar  # Marcar como visualizado (autenticado)
```

#### **Preferências** (`/api/v1/preferencias`)
```
GET    /preferencias             # Preferências do usuário (autenticado)
PUT    /preferencias             # Atualizar preferências (autenticado)
```

---

## 🔐 Autenticação e Segurança

### JWT (JSON Web Tokens)
- **Access Token:** Válido por 1 hora, assinado com HS256
- **Refresh Token:** Válido por 7 dias
- Geração via `io.jsonwebtoken:jjwt-api`
- Filtro `JwtAuthenticationFilter` (extends `OncePerRequestFilter`)

### Permissões (Spring Security)
- **Público (permitAll):** `/api/v1/auth/login`, `/api/v1/auth/register`, GET em localidades, desastres, weather
- **Autenticado (authenticated):** alertas personalizados, preferências, perfil
- **Admin (hasRole ADMIN):** criação/edição de alertas, gestão de usuários

### CORS (CorsConfig.java)
- Origins permitidas: `http://localhost:5173` (Vite dev), domínio de produção
- Métodos: GET, POST, PUT, DELETE, OPTIONS
- Headers: Authorization, Content-Type

### Senhas
- Hashing com `BCryptPasswordEncoder` (Spring Security)

---

## 🔄 Integração com APIs Externas

### OpenWeather — One Call API 3.0
- **Endpoint:** `https://api.openweathermap.org/data/3.0/onecall`
- **Dados:** Clima atual, previsão minutely/hourly/daily, array `alerts[]`
- **Autenticação:** API Key (query param `appid`)
- **Chamada:** Sob demanda (quando o frontend pede `/weather?lat=&lon=`)
- **Cache:** Redis, TTL 30 minutos (chave: `weather:{lat}:{lon}`)

### GDACS — Global Disaster Alert and Coordination System
- **Endpoint:** `https://www.gdacs.org/gdacsapi/api/events/geteventlist`
- **Dados:** Terremotos, enchentes, ciclones, erupções, incêndios florestais
- **Autenticação:** Nenhuma (API pública)
- **Chamada:** Job `@Scheduled` a cada 15 minutos (`GdacsSyncScheduler`)
- **Cache:** Redis, TTL 15 minutos

### INMET — Instituto Nacional de Meteorologia
- **Endpoint:** `https://apitempo.inmet.gov.br/`
- **Dados:** Dados observados de estações, avisos meteorológicos Brasil
- **Autenticação:** Nenhuma (API pública)
- **Chamada:** Job `@Scheduled` a cada 1 hora (`InmetSyncScheduler`)
- **Cache:** Redis, TTL 1 hora

### Estratégia de Cache (Redis)
```
weather:{lat}:{lon}       → TTL 30min  (OpenWeather sob demanda)
gdacs:events              → TTL 15min  (GDACS polling)
inmet:avisos              → TTL 1h     (INMET polling)
inmet:estacao:{codigo}    → TTL 1h     (Dados observados)
```

### Prioridade de fontes (Brasil)
1. **INMET** para avisos oficiais e dados de estação em território brasileiro
2. **OpenWeather** como fallback de clima e para alertas meteorológicos
3. **GDACS** para desastres de grande escala (complementar)

---

## 📦 Dependências Principais (pom.xml)

```xml
<!-- Spring Boot Starters -->
spring-boot-starter-web              <!-- REST API -->
spring-boot-starter-data-jpa         <!-- JPA + Hibernate -->
spring-boot-starter-security         <!-- Spring Security -->
spring-boot-starter-data-redis       <!-- Redis cache -->
spring-boot-starter-validation       <!-- Bean Validation -->
spring-boot-starter-webflux          <!-- WebClient (APIs externas) -->

<!-- Banco de Dados -->
postgresql                           <!-- Driver PostgreSQL -->
flyway-core                          <!-- Migrações de banco (opcional) -->

<!-- JWT -->
io.jsonwebtoken:jjwt-api             <!-- Geração/validação JWT -->
io.jsonwebtoken:jjwt-impl
io.jsonwebtoken:jjwt-jackson

<!-- Documentação -->
springdoc-openapi-starter-webmvc-ui  <!-- Swagger UI automático -->

<!-- Utilitários -->
lombok                               <!-- Boilerplate reduction -->
mapstruct                            <!-- Conversão Entity ↔ DTO (opcional) -->

<!-- Testes -->
spring-boot-starter-test             <!-- JUnit 5, Mockito, MockMvc -->
testcontainers:postgresql            <!-- Banco real em testes de integração -->
testcontainers:junit-jupiter
```

---

## 🐳 Docker Setup

### Dockerfile (multi-stage build)
```dockerfile
# Build
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

# Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### docker-compose.yml
```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: prevent_db
      POSTGRES_USER: prevent_user
      POSTGRES_PASSWORD: prevent_pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
      - redis
    environment:
      SPRING_PROFILES_ACTIVE: dev
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/prevent_db
      SPRING_DATASOURCE_USERNAME: prevent_user
      SPRING_DATASOURCE_PASSWORD: prevent_pass
      SPRING_DATA_REDIS_HOST: redis
      SPRING_DATA_REDIS_PORT: 6379
      OPENWEATHER_API_KEY: ${OPENWEATHER_API_KEY}
      JWT_SECRET: ${JWT_SECRET}

volumes:
  postgres_data:
```

### Comandos
```bash
# Subir tudo
docker compose up -d

# Rebuild após mudanças
docker compose up -d --build api

# Logs
docker compose logs -f api

# Derrubar tudo
docker compose down

# Derrubar e limpar volumes
docker compose down -v
```

---

## 🧪 Testes

### Estrutura
- **Unitários:** Services, Mappers, Validators (JUnit 5 + Mockito)
- **Integração:** Controllers com MockMvc, Repositories com Testcontainers
- **Cobertura mínima:** 80%

### Comandos
```bash
# Todos os testes
mvn test

# Com relatório de cobertura (JaCoCo)
mvn verify

# Classe específica
mvn test -Dtest=WeatherServiceTest
```

---

## 📈 Monitoramento e Logs

### Spring Boot Actuator
- `/actuator/health` — Health check (DB, Redis, APIs externas)
- `/actuator/metrics` — Métricas JVM e de requisições
- `/actuator/info` — Informações da aplicação

### Logs
- SLF4J + Logback (padrão do Spring Boot)
- Formato JSON em produção (`logback-spring.xml`)
- Níveis: TRACE, DEBUG, INFO, WARN, ERROR

### Swagger UI
- Disponível em `http://localhost:8080/swagger-ui.html`
- Documentação automática via `springdoc-openapi`

---

## 🚀 Deploy

### Checklist
- [ ] Configurar variáveis de ambiente (JWT_SECRET, OPENWEATHER_API_KEY)
- [ ] Rodar migrações Flyway (automático no startup)
- [ ] Configurar SSL/HTTPS (Nginx ou plataforma)
- [ ] Configurar domínio
- [ ] Ajustar profiles (application-prod.yml)
- [ ] Configurar backups automáticos do PostgreSQL
- [ ] Habilitar Actuator health checks

### Plataformas Recomendadas
- **Railway:** Deploy direto do Docker, $5-20/mês
- **Render:** Suporte a Docker, tier gratuito limitado
- **AWS (ECS/Fargate):** Mais controle, requer mais configuração
- **VPS (Hetzner/DigitalOcean):** Docker Compose direto, $5-10/mês

---

**Última atualização:** 03/04/2026