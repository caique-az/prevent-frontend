# ☕ Guia Spring Boot - Backend Prevent

## 🎯 Por que Spring Boot?

- **Ecossistema maduro:** Spring Data JPA, Spring Security, Spring WebSocket — battle-tested
- **Type safety:** Java 17 com tipagem estática e null safety
- **Documentação automática:** SpringDoc OpenAPI (Swagger UI) out-of-the-box
- **Segurança robusta:** Spring Security com suporte nativo a JWT, OAuth2, CORS
- **WebSockets nativos:** Spring WebSocket com STOMP para alertas em tempo real
- **Docker-friendly:** Build fácil com multi-stage Dockerfile
- **Mercado:** Stack mais demandada no mercado brasileiro

---

## 📦 Dependências Principais (pom.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <groupId>com.prevent</groupId>
    <artifactId>prevent-api</artifactId>
    <version>0.1.0-SNAPSHOT</version>
    <name>Prevent API</name>
    <description>API de Monitoramento de Desastres Naturais</description>

    <properties>
        <java.version>17</java.version>
        <jjwt.version>0.12.3</jjwt.version>
        <springdoc.version>2.3.0</springdoc.version>
        <mapstruct.version>1.5.5.Final</mapstruct.version>
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

        <!-- Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- WebSocket -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>

        <!-- Redis Cache -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>

        <!-- Mail -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>

        <!-- Actuator (monitoramento) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- OpenAPI / Swagger -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>${springdoc.version}</version>
        </dependency>

        <!-- Firebase (notificações push) -->
        <dependency>
            <groupId>com.google.firebase</groupId>
            <artifactId>firebase-admin</artifactId>
            <version>9.2.0</version>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- MapStruct (mapeamento Entity <-> DTO) -->
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${mapstruct.version}</version>
        </dependency>

        <!-- Testes -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## 🚀 Entry Point (PreventApplication.java)

```java
package com.prevent.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableCaching
@EnableScheduling
public class PreventApplication {

    public static void main(String[] args) {
        SpringApplication.run(PreventApplication.class, args);
    }
}
```

---

## ⚙️ Configurações (application.yml)

```yaml
server:
  port: 8080

spring:
  application:
    name: prevent-api

  datasource:
    url: jdbc:postgresql://localhost:5432/prevent_db
    username: prevent_user
    password: prevent_pass
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect

  flyway:
    enabled: true
    locations: classpath:db/migration

  data:
    redis:
      host: localhost
      port: 6379

  jackson:
    property-naming-strategy: LOWER_CAMEL_CASE
    serialization:
      write-dates-as-timestamps: false

app:
  jwt:
    secret: ${JWT_SECRET:minha-chave-secreta-super-segura-para-desenvolvimento}
    access-token-expiration-ms: 3600000    # 1 hora
    refresh-token-expiration-ms: 604800000 # 7 dias
  cors:
    allowed-origins: http://localhost:5173,http://localhost:3000

springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
```

---

## 🔐 Security (config/SecurityConfig.java)

```java
package com.prevent.api.config;

import com.prevent.api.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                // Público
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/estados/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/cidades/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/bairros/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/desastres/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/busca/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/api-docs/**").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                // Admin
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                // Autenticado
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

---

## 🔑 JWT (security/JwtTokenProvider.java)

```java
package com.prevent.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.access-token-expiration-ms}")
    private long accessTokenExpirationMs;

    @Value("${app.jwt.refresh-token-expiration-ms}")
    private long refreshTokenExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessTokenExpirationMs);

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    public String generateRefreshToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshTokenExpirationMs);

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

---

## 📋 Base Entity (model/BaseEntity.java)

```java
package com.prevent.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
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

---

## 📝 Exemplo de Entity (model/Estado.java)

```java
package com.prevent.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "estados")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @Builder.Default
    private List<Cidade> cidades = new ArrayList<>();
}
```

---

## 🎨 Exemplo de DTO (dto/response/EstadoResponse.java)

```java
package com.prevent.api.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record EstadoResponse(
    Long id,
    String nome,
    String sigla,
    String codigoIbge,
    String regiao,
    Integer populacao,
    BigDecimal areaKm2,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
```

### DTO de criação (dto/request/EstadoCreateRequest.java)

```java
package com.prevent.api.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record EstadoCreateRequest(
    @NotBlank @Size(min = 1, max = 100)
    String nome,

    @NotBlank @Size(min = 2, max = 2)
    String sigla,

    @NotBlank @Size(min = 2, max = 2)
    String codigoIbge,

    @NotBlank
    String regiao,

    @PositiveOrZero
    Integer populacao,

    @PositiveOrZero
    BigDecimal areaKm2
) {}
```

---

## 🗂️ Exemplo de Repository (repository/EstadoRepository.java)

```java
package com.prevent.api.repository;

import com.prevent.api.model.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {

    Optional<Estado> findBySiglaIgnoreCase(String sigla);

    Optional<Estado> findByNomeIgnoreCase(String nome);

    @Query("SELECT e FROM Estado e WHERE LOWER(e.nome) LIKE LOWER(CONCAT('%', :termo, '%')) " +
           "OR LOWER(e.sigla) LIKE LOWER(CONCAT('%', :termo, '%'))")
    List<Estado> buscarPorTermo(@Param("termo") String termo);

    List<Estado> findByRegiaoIgnoreCase(String regiao);
}
```

---

## ⚙️ Exemplo de Service (service/EstadoService.java)

```java
package com.prevent.api.service;

import com.prevent.api.dto.request.EstadoCreateRequest;
import com.prevent.api.dto.response.EstadoResponse;
import com.prevent.api.exception.ResourceNotFoundException;
import com.prevent.api.model.Estado;
import com.prevent.api.repository.EstadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstadoService {

    private final EstadoRepository estadoRepository;

    @Cacheable("estados")
    @Transactional(readOnly = true)
    public List<EstadoResponse> listarTodos() {
        return estadoRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EstadoResponse buscarPorId(Long id) {
        Estado estado = estadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estado não encontrado com id: " + id));
        return toResponse(estado);
    }

    @Transactional(readOnly = true)
    public EstadoResponse buscarPorNome(String nome) {
        Estado estado = estadoRepository.findByNomeIgnoreCase(nome)
                .or(() -> estadoRepository.findBySiglaIgnoreCase(nome))
                .orElseThrow(() -> new ResourceNotFoundException("Estado não encontrado: " + nome));
        return toResponse(estado);
    }

    @Transactional
    public EstadoResponse criar(EstadoCreateRequest request) {
        Estado estado = Estado.builder()
                .nome(request.nome())
                .sigla(request.sigla())
                .codigoIbge(request.codigoIbge())
                .regiao(request.regiao())
                .populacao(request.populacao())
                .areaKm2(request.areaKm2())
                .build();

        estado = estadoRepository.save(estado);
        return toResponse(estado);
    }

    @Transactional
    public void deletar(Long id) {
        if (!estadoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Estado não encontrado com id: " + id);
        }
        estadoRepository.deleteById(id);
    }

    private EstadoResponse toResponse(Estado estado) {
        return new EstadoResponse(
                estado.getId(),
                estado.getNome(),
                estado.getSigla(),
                estado.getCodigoIbge(),
                estado.getRegiao(),
                estado.getPopulacao(),
                estado.getAreaKm2(),
                estado.getCreatedAt(),
                estado.getUpdatedAt()
        );
    }
}
```

---

## 🛣️ Exemplo de Controller (controller/EstadoController.java)

```java
package com.prevent.api.controller;

import com.prevent.api.dto.request.EstadoCreateRequest;
import com.prevent.api.dto.response.EstadoResponse;
import com.prevent.api.service.EstadoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/estados")
@RequiredArgsConstructor
@Tag(name = "Estados", description = "Endpoints de estados brasileiros")
public class EstadoController {

    private final EstadoService estadoService;

    @GetMapping
    @Operation(summary = "Lista todos os estados")
    public ResponseEntity<List<EstadoResponse>> listarTodos() {
        return ResponseEntity.ok(estadoService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca estado por ID")
    public ResponseEntity<EstadoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(estadoService.buscarPorId(id));
    }

    @GetMapping("/nome/{nome}")
    @Operation(summary = "Busca estado por nome ou sigla")
    public ResponseEntity<EstadoResponse> buscarPorNome(@PathVariable String nome) {
        return ResponseEntity.ok(estadoService.buscarPorNome(nome));
    }

    @PostMapping
    @Operation(summary = "Cria um novo estado")
    public ResponseEntity<EstadoResponse> criar(@Valid @RequestBody EstadoCreateRequest request) {
        EstadoResponse response = estadoService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta um estado")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        estadoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## ❌ Tratamento de Erros (exception/GlobalExceptionHandler.java)

```java
package com.prevent.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException ex) {
        Map<String, Object> body = Map.of(
            "timestamp", LocalDateTime.now(),
            "status", 404,
            "error", "Not Found",
            "message", ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });

        Map<String, Object> body = Map.of(
            "timestamp", LocalDateTime.now(),
            "status", 400,
            "error", "Bad Request",
            "errors", errors
        );
        return ResponseEntity.badRequest().body(body);
    }
}
```

---

## 🧪 Exemplo de Teste (test/controller/EstadoControllerTest.java)

```java
package com.prevent.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prevent.api.dto.request.EstadoCreateRequest;
import com.prevent.api.dto.response.EstadoResponse;
import com.prevent.api.service.EstadoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockbean.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false) // desabilita security nos testes
class EstadoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EstadoService estadoService;

    @Test
    void deveListarTodosOsEstados() throws Exception {
        var response = new EstadoResponse(
            1L, "São Paulo", "SP", "35", "Sudeste",
            46649132, new BigDecimal("248219.63"),
            LocalDateTime.now(), LocalDateTime.now()
        );

        when(estadoService.listarTodos()).thenReturn(List.of(response));

        mockMvc.perform(get("/api/v1/estados"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("São Paulo"))
                .andExpect(jsonPath("$[0].sigla").value("SP"));
    }

    @Test
    void deveCriarEstado() throws Exception {
        var request = new EstadoCreateRequest(
            "São Paulo", "SP", "35", "Sudeste",
            46649132, new BigDecimal("248219.63")
        );

        var response = new EstadoResponse(
            1L, "São Paulo", "SP", "35", "Sudeste",
            46649132, new BigDecimal("248219.63"),
            LocalDateTime.now(), LocalDateTime.now()
        );

        when(estadoService.criar(request)).thenReturn(response);

        mockMvc.perform(post("/api/v1/estados")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("São Paulo"))
                .andExpect(jsonPath("$.sigla").value("SP"));
    }
}
```

---

## 🔄 Migrações com Flyway

### Estrutura
```
src/main/resources/db/migration/
├── V1__create_estados.sql
├── V2__create_cidades.sql
├── V3__create_bairros.sql
├── V4__create_areas_risco.sql
├── V5__seed_estados.sql
└── ...
```

### Exemplo de migration (V1__create_estados.sql)
```sql
CREATE TABLE estados (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    sigla VARCHAR(2) NOT NULL UNIQUE,
    codigo_ibge VARCHAR(2) NOT NULL UNIQUE,
    regiao VARCHAR(20) NOT NULL,
    populacao INTEGER,
    area_km2 DECIMAL(12, 2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_estados_sigla ON estados(sigla);
CREATE INDEX idx_estados_regiao ON estados(regiao);
```

### Comandos úteis
```bash
# Flyway roda automaticamente no startup do Spring Boot
# Para forçar re-execução:
mvn flyway:migrate
mvn flyway:clean   # CUIDADO: apaga tudo
mvn flyway:info    # Status das migrations
```

---

## 🐳 Docker

### Dockerfile (multi-stage)

```dockerfile
# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -B
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

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

volumes:
  postgres_data:
```

---

## 🚀 Comandos para Rodar

### Desenvolvimento (local)
```bash
# Subir apenas PostgreSQL e Redis via Docker
docker-compose up -d db redis

# Rodar a aplicação
mvn spring-boot:run

# Ou com perfil dev
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Desenvolvimento (tudo via Docker)
```bash
docker-compose up --build
```

### Produção
```bash
# Build
mvn clean package -DskipTests

# Rodar o JAR
java -jar target/prevent-api-0.1.0-SNAPSHOT.jar --spring.profiles.active=prod
```

### Testes
```bash
# Todos os testes
mvn test

# Com cobertura (JaCoCo)
mvn test jacoco:report

# Teste específico
mvn test -Dtest=EstadoControllerTest

# Build completo com testes
mvn clean verify
```

---

## 📊 Endpoints Automáticos

- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON:** `http://localhost:8080/api-docs`
- **Health Check:** `http://localhost:8080/actuator/health`
- **Métricas:** `http://localhost:8080/actuator/metrics`

---

**Última atualização:** Março 2026
**Versão:** 1.0.0
