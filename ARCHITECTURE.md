# 🏗️ Arquitetura do Sistema Prevent

## 📋 Visão Geral

O Prevent é um sistema multiplataforma de monitoramento de desastres naturais composto por três camadas principais:

```
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                │
├──────────────────────────┬──────────────────────────────┤
│   Frontend Web (React)   │   Mobile (React Native)      │
│   - Vite + Bootstrap     │   - Expo + TailwindCSS       │
│   - Leaflet Maps         │   - React Native Maps        │
│   - Recharts             │   - Push Notifications       │
└──────────────────────────┴──────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE API                         │
│              Spring Boot 3 (Java 17)                     │
│   - Spring Security + JWT (OAuth2 Resource Server)       │
│   - SpringDoc OpenAPI (Swagger UI automático)            │
│   - CORS configurado via WebMvcConfigurer                │
│   - Spring WebSocket (STOMP) para alertas em tempo real  │
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
│   │  (JDBC/JPA)  │ (Spring     │  (RestTemplate/  │   │
│   │              │  Data Redis) │   WebClient)     │   │
│   └──────────────┴──────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## ☕ Backend Spring Boot - Estrutura Detalhada

### Estrutura de Diretórios

```
backend/
├── pom.xml                          # Maven - gerenciamento de dependências
├── Dockerfile
├── docker-compose.yml
├── README.md
├── .env.example
├── .gitignore
│
├── src/
│   ├── main/
│   │   ├── java/com/prevent/api/
│   │   │   ├── PreventApplication.java          # Entry point Spring Boot
│   │   │   │
│   │   │   ├── config/                          # Configurações
│   │   │   │   ├── SecurityConfig.java          # Spring Security + JWT
│   │   │   │   ├── CorsConfig.java              # CORS
│   │   │   │   ├── WebSocketConfig.java         # WebSocket STOMP
│   │   │   │   ├── RedisConfig.java             # Cache Redis
│   │   │   │   ├── OpenApiConfig.java           # Swagger/OpenAPI
│   │   │   │   └── RestTemplateConfig.java      # HTTP client para APIs externas
│   │   │   │
│   │   │   ├── model/                           # JPA Entities
│   │   │   │   ├── BaseEntity.java              # Entidade base com id, timestamps
│   │   │   │   ├── User.java                    # Usuário
│   │   │   │   ├── UserProfile.java             # Perfil de usuário
│   │   │   │   ├── UserPreferences.java         # Preferências
│   │   │   │   ├── Estado.java                  # Estado
│   │   │   │   ├── Cidade.java                  # Cidade
│   │   │   │   ├── Bairro.java                  # Bairro
│   │   │   │   ├── AreaDeRisco.java             # Área de risco
│   │   │   │   ├── TipoDesastre.java            # Tipo de desastre
│   │   │   │   ├── Desastre.java                # Desastre
│   │   │   │   ├── HistoricoDesastre.java        # Histórico
│   │   │   │   ├── Alerta.java                  # Alerta
│   │   │   │   ├── AlertaUsuario.java           # Relação alerta-usuário
│   │   │   │   └── Notification.java            # Notificação
│   │   │   │
│   │   │   ├── repository/                      # Spring Data JPA Repositories
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── EstadoRepository.java
│   │   │   │   ├── CidadeRepository.java
│   │   │   │   ├── BairroRepository.java
│   │   │   │   ├── AreaDeRiscoRepository.java
│   │   │   │   ├── DesastreRepository.java
│   │   │   │   ├── AlertaRepository.java
│   │   │   │   └── NotificationRepository.java
│   │   │   │
│   │   │   ├── dto/                             # Data Transfer Objects
│   │   │   │   ├── request/                     # DTOs de entrada
│   │   │   │   │   ├── UserCreateRequest.java
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── EstadoCreateRequest.java
│   │   │   │   │   └── ...
│   │   │   │   └── response/                    # DTOs de saída
│   │   │   │       ├── UserResponse.java
│   │   │   │       ├── EstadoResponse.java
│   │   │   │       ├── CidadeResponse.java
│   │   │   │       ├── TokenResponse.java
│   │   │   │       └── ...
│   │   │   │
│   │   │   ├── service/                         # Lógica de negócio
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── EstadoService.java
│   │   │   │   ├── CidadeService.java
│   │   │   │   ├── BairroService.java
│   │   │   │   ├── DesastreService.java
│   │   │   │   ├── AlertaService.java
│   │   │   │   └── NotificationService.java
│   │   │   │
│   │   │   ├── controller/                      # REST Controllers
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── UserController.java
│   │   │   │   ├── EstadoController.java
│   │   │   │   ├── CidadeController.java
│   │   │   │   ├── BairroController.java
│   │   │   │   ├── DesastreController.java
│   │   │   │   ├── AlertaController.java
│   │   │   │   └── NotificationController.java
│   │   │   │
│   │   │   ├── external/                        # Integração com APIs externas
│   │   │   │   ├── InmetClient.java             # API INMET
│   │   │   │   ├── CemadenClient.java           # API CEMADEN
│   │   │   │   └── InpeClient.java              # API INPE (queimadas)
│   │   │   │
│   │   │   ├── security/                        # Segurança
│   │   │   │   ├── JwtTokenProvider.java         # Geração e validação de JWT
│   │   │   │   ├── JwtAuthenticationFilter.java  # Filtro de autenticação
│   │   │   │   └── CustomUserDetailsService.java # UserDetailsService
│   │   │   │
│   │   │   ├── exception/                       # Tratamento de erros
│   │   │   │   ├── GlobalExceptionHandler.java  # @ControllerAdvice
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   ├── BadRequestException.java
│   │   │   │   └── UnauthorizedException.java
│   │   │   │
│   │   │   ├── websocket/                       # WebSocket handlers
│   │   │   │   └── AlertWebSocketHandler.java
│   │   │   │
│   │   │   └── util/                            # Utilitários
│   │   │       ├── CacheUtil.java
│   │   │       └── FirebaseUtil.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml                  # Configurações principais
│   │       ├── application-dev.yml              # Perfil de desenvolvimento
│   │       ├── application-prod.yml             # Perfil de produção
│   │       └── db/migration/                    # Flyway migrations
│   │           ├── V1__create_estados.sql
│   │           ├── V2__create_cidades.sql
│   │           ├── V3__create_bairros.sql
│   │           └── ...
│   │
│   └── test/
│       └── java/com/prevent/api/
│           ├── controller/
│           │   ├── AuthControllerTest.java
│           │   ├── EstadoControllerTest.java
│           │   ├── CidadeControllerTest.java
│           │   └── ...
│           ├── service/
│           │   ├── AuthServiceTest.java
│           │   ├── EstadoServiceTest.java
│           │   └── ...
│           └── repository/
│               ├── EstadoRepositoryTest.java
│               └── ...
```

---

## 📊 Modelos de Dados (JPA Entities)

### `model/BaseEntity.java`

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

### `model/Estado.java`

```java
@Entity
@Table(name = "estados")
public class Estado extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(length = 2, unique = true, nullable = false)
    private String sigla;

    @Column(length = 2, unique = true, nullable = false)
    private String codigoIbge;

    @Column(length = 20, nullable = false)
    private String regiao;

    private Integer populacao;

    @Column(precision = 12, scale = 2)
    private BigDecimal areaKm2;

    @OneToMany(mappedBy = "estado", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cidade> cidades = new ArrayList<>();
}
```

### `model/Cidade.java`

```java
@Entity
@Table(name = "cidades")
public class Cidade extends BaseEntity {

    @Column(length = 200, nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @Column(length = 7, unique = true, nullable = false)
    private String codigoIbge;

    @Column(precision = 10, scale = 7, nullable = false)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 7, nullable = false)
    private BigDecimal longitude;

    private Integer populacao;

    @OneToMany(mappedBy = "cidade", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Bairro> bairros = new ArrayList<>();
}
```

### `model/Bairro.java`

```java
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

    @OneToMany(mappedBy = "bairro", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AreaDeRisco> areasDeRisco = new ArrayList<>();
}
```

### `model/AreaDeRisco.java`

```java
@Entity
@Table(name = "areas_risco")
public class AreaDeRisco extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bairro_id", nullable = false)
    private Bairro bairro;

    @Column(length = 50, nullable = false)
    private String tipoRisco; // enchente, deslizamento, etc.

    @Column(length = 20, nullable = false)
    private String nivelRisco; // baixo, médio, alto, muito alto

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "jsonb")
    private String coordenadasPoligono; // GeoJSON

    @Column(nullable = false)
    private Boolean ativo = true;
}
```

### `model/TipoDesastre.java`

```java
@Entity
@Table(name = "tipos_desastre")
public class TipoDesastre extends BaseEntity {

    @Column(length = 100, nullable = false)
    private String nome; // Enchente, Deslizamento, etc.

    @Column(length = 20, unique = true, nullable = false)
    private String codigo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(length = 7)
    private String corHex; // Para UI

    @Column(length = 50)
    private String icone; // Nome do ícone
}
```

### `model/Desastre.java`

```java
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

    @Column(nullable = false)
    private LocalDateTime dataOcorrencia;

    private LocalDateTime dataFim;

    @Column(length = 20, nullable = false)
    private String gravidade; // baixa, média, alta, crítica

    @Column(nullable = false)
    private Integer vitimas = 0;

    @Column(nullable = false)
    private Integer desabrigados = 0;

    @Column(length = 20, nullable = false)
    private String status; // ativo, controlado, finalizado

    @Column(length = 100)
    private String fonte; // defesa_civil, api_externa, etc.
}
```

### `model/Alerta.java`

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

    @Column(length = 20, nullable = false)
    private String nivelUrgencia; // baixo, médio, alto, crítico

    @Column(nullable = false)
    private LocalDateTime dataInicio;

    private LocalDateTime dataFim;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(length = 100)
    private String fonte;
}
```

### `model/User.java` e relacionados

```java
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(length = 150, unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Role role = Role.USER; // USER, ADMIN

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile profile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserPreferences preferences;
}

@Entity
@Table(name = "user_profiles")
public class UserProfile extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 20)
    private String telefone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bairro_id")
    private Bairro bairro;

    private String fotoPerfil;
}

@Entity
@Table(name = "user_preferences")
public class UserPreferences extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private Boolean notificacoesPush = true;

    @Column(nullable = false)
    private Boolean notificacoesEmail = true;

    @Column(nullable = false)
    private Boolean notificacoesSms = false;

    @ManyToMany
    @JoinTable(
        name = "user_tipos_desastre",
        joinColumns = @JoinColumn(name = "preferences_id"),
        inverseJoinColumns = @JoinColumn(name = "tipo_desastre_id")
    )
    private Set<TipoDesastre> tiposDesastreInteresse = new HashSet<>();

    @Column(nullable = false)
    private Integer raioAlertaKm = 50;

    @Column(length = 20, nullable = false)
    private String tema = "claro"; // claro, escuro, sistema
}
```

---

## 🔌 Endpoints da API

### Base URL: `/api/v1/`

#### **Autenticação** (`/api/v1/auth`)
```
POST   /auth/register          # Registro de novo usuário
POST   /auth/login             # Login (retorna JWT)
POST   /auth/refresh           # Refresh token
POST   /auth/logout            # Logout
GET    /auth/me                # Dados do usuário logado
PUT    /auth/me                # Atualizar perfil
```

#### **Localidades** (`/api/v1/`)
```
GET    /estados                # Lista todos os estados
GET    /estados/{id}           # Detalhes de um estado
GET    /estados/{id}/cidades   # Cidades de um estado

GET    /cidades                # Lista cidades (com filtros)
GET    /cidades/{id}           # Detalhes de uma cidade
GET    /cidades/{id}/bairros   # Bairros de uma cidade
GET    /cidades/buscar?q=      # Busca por nome

GET    /bairros                # Lista bairros
GET    /bairros/{id}           # Detalhes de um bairro
GET    /bairros/{id}/areas-risco # Áreas de risco do bairro
```

#### **Desastres** (`/api/v1/`)
```
GET    /tipos-desastre         # Tipos de desastre
GET    /desastres              # Lista desastres (filtros: cidade, tipo, data)
GET    /desastres/{id}         # Detalhes de um desastre
GET    /desastres/ativos       # Desastres ativos
GET    /historico              # Histórico de desastres
GET    /estatisticas           # Estatísticas gerais
```

#### **Alertas** (`/api/v1/`)
```
GET    /alertas                # Lista alertas (filtros: cidade, ativo)
GET    /alertas/{id}           # Detalhes de um alerta
GET    /alertas/ativos         # Alertas ativos
GET    /alertas/meus           # Alertas do usuário logado (autenticado)
POST   /alertas/{id}/visualizar # Marcar como visualizado (autenticado)
```

#### **Notificações** (`/api/v1/`)
```
GET    /notificacoes           # Lista notificações do usuário
GET    /notificacoes/{id}      # Detalhes de uma notificação
POST   /notificacoes/{id}/ler  # Marcar como lida
GET    /preferencias           # Preferências de notificação
PUT    /preferencias           # Atualizar preferências
POST   /dispositivos           # Registrar dispositivo (FCM token)
```

---

## 🔐 Autenticação e Segurança

### JWT (JSON Web Tokens) via Spring Security
- **Access Token:** Válido por 1 hora
- **Refresh Token:** Válido por 7 dias
- Implementado com `jjwt` (io.jsonwebtoken)
- Filtro customizado `JwtAuthenticationFilter` no Spring Security filter chain
- Armazenamento seguro no cliente (HttpOnly cookies ou AsyncStorage no mobile)

### Permissões (Roles)
- **Público (`permitAll`):** Acesso a dados de localidades e desastres
- **Autenticado (`ROLE_USER`):** Acesso a alertas personalizados e notificações
- **Admin (`ROLE_ADMIN`):** CRUD completo, criação de alertas, gerenciamento de dados

### CORS
- Configurado via `WebMvcConfigurer` para aceitar requisições do frontend web e mobile
- Headers permitidos: Authorization, Content-Type

---

## 🔄 Integração com APIs Externas

### INMET (Instituto Nacional de Meteorologia)
- **Endpoint:** `https://apitempo.inmet.gov.br/`
- **Dados:** Previsão do tempo, precipitação, temperatura
- **Frequência:** Atualização a cada 1 hora (`@Scheduled`)

### CEMADEN (Centro Nacional de Monitoramento e Alertas)
- **Endpoint:** `http://www.cemaden.gov.br/`
- **Dados:** Alertas de desastres, pluviometria
- **Frequência:** Atualização a cada 30 minutos (`@Scheduled`)

### INPE (Instituto Nacional de Pesquisas Espaciais)
- **Endpoint:** `https://queimadas.dgi.inpe.br/`
- **Dados:** Focos de incêndio
- **Frequência:** Atualização a cada 3 horas (`@Scheduled`)

### Cache Strategy
- Spring Data Redis para cache de respostas de APIs externas (`@Cacheable`)
- TTL: 1 hora para dados meteorológicos, 30 minutos para alertas

---

## 📦 Dependências Principais (pom.xml)

```xml
<!-- Spring Boot Starters -->
<dependency>spring-boot-starter-web</dependency>
<dependency>spring-boot-starter-data-jpa</dependency>
<dependency>spring-boot-starter-security</dependency>
<dependency>spring-boot-starter-validation</dependency>
<dependency>spring-boot-starter-websocket</dependency>
<dependency>spring-boot-starter-data-redis</dependency>
<dependency>spring-boot-starter-mail</dependency>

<!-- Database -->
<dependency>postgresql</dependency>
<dependency>flyway-core</dependency>

<!-- JWT -->
<dependency>io.jsonwebtoken:jjwt-api</dependency>
<dependency>io.jsonwebtoken:jjwt-impl</dependency>
<dependency>io.jsonwebtoken:jjwt-jackson</dependency>

<!-- Documentação API -->
<dependency>org.springdoc:springdoc-openapi-starter-webmvc-ui</dependency>

<!-- Firebase (notificações push) -->
<dependency>com.google.firebase:firebase-admin</dependency>

<!-- Utilitários -->
<dependency>org.projectlombok:lombok</dependency>
<dependency>org.mapstruct:mapstruct</dependency>

<!-- Testes -->
<dependency>spring-boot-starter-test</dependency>
<dependency>spring-security-test</dependency>
<dependency>com.h2database:h2</dependency> <!-- BD em memória para testes -->
```

---

## 🐳 Docker Setup

### docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
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

  backend:
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

volumes:
  postgres_data:
```

### Dockerfile

```dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 🧪 Testes

### Estrutura de Testes
- **Unitários:** Testes de services com Mockito
- **Integração:** Testes de controllers com `@SpringBootTest` + `MockMvc`
- **Repositório:** Testes de queries com `@DataJpaTest` + H2
- **Cobertura mínima:** 80% (JaCoCo)

### Comandos
```bash
# Rodar todos os testes
mvn test

# Com relatório de cobertura
mvn test jacoco:report

# Testes específicos
mvn test -Dtest=EstadoControllerTest

# Build completo (inclui testes)
mvn clean verify
```

---

## 📈 Monitoramento e Logs

### Spring Boot Actuator
- `/actuator/health` — Health check
- `/actuator/metrics` — Métricas da aplicação
- `/actuator/info` — Informações do build

### Sentry
- Error tracking em produção
- Alertas para erros críticos

### Logs (SLF4J + Logback)
- Logs estruturados (JSON em produção)
- Níveis: TRACE, DEBUG, INFO, WARN, ERROR
- Rotação de logs diária
- Configuração via `logback-spring.xml`

### Métricas
- Tempo de resposta de endpoints
- Taxa de erro
- Uso de cache (hits/misses)
- Requisições por minuto
- Micrometer + Prometheus (opcional)

---

## 🚀 Deploy

### Checklist de Deploy
- [ ] Configurar variáveis de ambiente (`application-prod.yml`)
- [ ] Executar migrações Flyway (automático no startup)
- [ ] Configurar SSL/HTTPS
- [ ] Configurar domínio
- [ ] Configurar Redis em produção
- [ ] Configurar backups automáticos do PostgreSQL
- [ ] Configurar monitoramento (Actuator + Sentry)
- [ ] Build da imagem Docker

### Plataformas Recomendadas
- **Railway:** Fácil setup para Docker, $10-30/mês
- **Render:** Suporte a Docker, tier gratuito limitado
- **AWS (ECS/EC2):** Mais controle, requer mais configuração
- **Google Cloud Run:** Bom para containers, pay-per-use

---

**Última atualização:** Março 2026
