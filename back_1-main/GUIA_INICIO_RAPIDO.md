# Guía de Inicio Rápido - REST API Demo

## Prerequisitos

Antes de comenzar, asegúrate de tener instalado:
- Java JDK 17 o superior
- Maven 3.6+ (o puedes usar el Maven Wrapper incluido)

Si no los tienes instalados, consulta la sección "Instalación desde Cero" en el archivo README.md

## Iniciar la Aplicación

### Paso 1: Compilar el proyecto
```bash
mvn clean install
```

### Paso 2: Ejecutar la aplicación
```bash
mvn spring-boot:run
```

**La aplicación estará corriendo en http://localhost:8080**

---

## Acceder a Swagger

Una vez iniciada la aplicación, abre tu navegador y accede a:

**Swagger UI:** http://localhost:8080/swagger-ui.html

Desde Swagger podrás:
- Ver todos los endpoints disponibles
- Probar cada endpoint directamente desde el navegador
- Ver ejemplos de request y response
- Ver la documentación de cada parámetro

---

## Probar los Endpoints

### Opción 1: Usar Swagger UI (Recomendado para principiantes)
1. Abre http://localhost:8080/swagger-ui.html
2. Haz clic en cualquier endpoint (ej: GET /api/users)
3. Haz clic en "Try it out"
4. Haz clic en "Execute"
5. Verás la respuesta en tiempo real

### Opción 2: Usar curl (Línea de comandos)

#### 1. Obtener todos los usuarios
```bash
curl http://localhost:8080/api/users
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "edad": 30
  },
  {
    "id": 2,
    "nombre": "María García",
    "email": "maria@example.com",
    "edad": 25
  },
  {
    "id": 3,
    "nombre": "Carlos López",
    "email": "carlos@example.com",
    "edad": 35
  }
]
```

#### 2. Obtener un usuario específico por ID
```bash
curl http://localhost:8080/api/users/1
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "edad": 30
}
```

#### 3. Buscar usuarios por nombre
```bash
curl "http://localhost:8080/api/users/search?nombre=Juan"
```

#### 4. Crear un nuevo usuario (POST)

**En Windows (PowerShell):**
```bash
curl -X POST http://localhost:8080/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"nombre\":\"Ana Torres\",\"email\":\"ana@example.com\",\"edad\":28}"
```

**En Linux/macOS:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana Torres","email":"ana@example.com","edad":28}'
```

**Respuesta esperada:**
```json
{
  "id": 4,
  "nombre": "Ana Torres",
  "email": "ana@example.com",
  "edad": 28
}
```

#### 5. Actualizar un usuario (PUT)

**En Windows (PowerShell):**
```bash
curl -X PUT http://localhost:8080/api/users/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"nombre\":\"Juan Pérez Actualizado\",\"email\":\"juan.nuevo@example.com\",\"edad\":31}"
```

**En Linux/macOS:**
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez Actualizado","email":"juan.nuevo@example.com","edad":31}'
```

#### 6. Eliminar un usuario (DELETE)
```bash
curl -X DELETE http://localhost:8080/api/users/1
```

### Opción 3: Usar Postman o Insomnia

También puedes importar los endpoints en herramientas gráficas como:
- **Postman**: https://www.postman.com/downloads/
- **Insomnia**: https://insomnia.rest/download

Para importar la API:
1. Abre Postman o Insomnia
2. Selecciona "Import" (Importar)
3. Introduce la URL: http://localhost:8080/api-docs
4. La herramienta importará automáticamente todos los endpoints

---

## Conceptos REST que Aprenderás

### 1. Métodos HTTP
- **GET**: Obtener recursos (no modifica datos)
- **POST**: Crear nuevos recursos
- **PUT**: Actualizar recursos existentes
- **DELETE**: Eliminar recursos

### 2. Códigos de Estado HTTP
- **200 OK**: Petición exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Petición exitosa sin contenido (ej: DELETE)
- **404 Not Found**: Recurso no encontrado
- **400 Bad Request**: Datos inválidos en la petición

### 3. Partes de una URL REST
```
http://localhost:8080/api/users/1?nombre=Juan
└─────┬─────┘└─┬─┘└─┬──┘└──┬───┘└─┬──┬───────┘
    Base URL  Port  Base  Path   Path Query
                    Path       Variable
```

**Explicación:**
- **Base URL**: `http://localhost` - el protocolo y servidor
- **Port**: `8080` - el puerto donde corre la aplicación
- **Base Path**: `/api` - prefijo común para todos los endpoints
- **Path**: `/users/1` - el recurso específico (usuarios con id=1)
- **Query**: `?nombre=Juan` - parámetros adicionales opcionales

### 4. Estructura de Request/Response JSON
```json
{
  "id": 1,              // Identificador único
  "nombre": "Juan",     // Datos del recurso
  "email": "juan@...",
  "edad": 30
}
```

---

## Ejercicios Prácticos

### Ejercicio 1: Explorar con Swagger (Nivel: Básico)
1. Inicia la aplicación
2. Abre Swagger UI en http://localhost:8080/swagger-ui.html
3. Haz clic en el endpoint GET /api/users
4. Haz clic en "Try it out" y luego en "Execute"
5. Examina la respuesta JSON

**Objetivo**: Familiarizarte con la interfaz de Swagger y entender cómo se ven los datos

### Ejercicio 2: Crear tu primer usuario (Nivel: Básico)
1. En Swagger UI, busca el endpoint POST /api/users
2. Haz clic en "Try it out"
3. Modifica el JSON de ejemplo con tus propios datos
4. Haz clic en "Execute"
5. Copia el ID del usuario creado
6. Usa GET /api/users para verificar que el usuario fue creado

**Objetivo**: Aprender a crear recursos usando POST

### Ejercicio 3: Buscar por nombre (Nivel: Básico)
1. Usa el endpoint GET /api/users/search
2. En el parámetro "nombre", escribe "María"
3. Ejecuta la búsqueda
4. Observa cómo el servidor filtra los resultados

**Objetivo**: Entender cómo funcionan los parámetros de búsqueda (query parameters)

### Ejercicio 4: Actualizar datos (Nivel: Intermedio)
1. Elige un usuario existente (anota su ID)
2. Usa GET /api/users/{id} para ver sus datos actuales
3. Usa PUT /api/users/{id} para cambiar su email
4. Verifica el cambio volviendo a hacer GET /api/users/{id}

**Objetivo**: Aprender la diferencia entre GET (lectura) y PUT (actualización)

### Ejercicio 5: Ciclo completo CRUD (Nivel: Intermedio)
Realiza todas las operaciones en orden:
1. **C**reate (POST): Crea un nuevo usuario llamado "Test Usuario"
2. **R**ead (GET): Lee el usuario que acabas de crear usando su ID
3. **U**pdate (PUT): Cambia su edad a 40
4. **D**elete (DELETE): Elimina el usuario

**Objetivo**: Dominar el ciclo completo de operaciones CRUD

### Ejercicio 6: Manejo de errores (Nivel: Avanzado)
1. Intenta obtener un usuario con un ID que no existe (ej: 999): GET /api/users/999
2. Observa que recibes un código 404 (Not Found)
3. Intenta crear un usuario sin datos: POST /api/users con body vacío
4. Observa los diferentes códigos de error

**Objetivo**: Entender cómo la API maneja situaciones de error

---

## Verificar que Todo Funciona

### 1. La aplicación inicia correctamente
Deberías ver en la consola:
```
===========================================
Aplicación REST API Demo iniciada!
Swagger UI: http://localhost:8080/swagger-ui.html
API Docs: http://localhost:8080/api-docs
===========================================
```

### 2. Swagger está accesible
Abre http://localhost:8080/swagger-ui.html y deberías ver:
- El título "REST API Demo - Documentación"
- Una sección llamada "user-controller"
- Una lista de endpoints disponibles

### 3. Los endpoints responden
Ejecuta en una terminal:
```bash
curl http://localhost:8080/api/users
```
Deberías recibir un JSON con 3 usuarios (Juan, María y Carlos)

---

## Solución de Problemas

### Error: "mvn no se reconoce como comando"
**Solución**: Maven no está instalado o no está en el PATH.
- Opción 1: Usa el Maven Wrapper incluido: `.\mvnw.cmd` en Windows o `./mvnw` en Linux/macOS
- Opción 2: Instala Maven siguiendo las instrucciones en el README.md

### Error: "java no se reconoce como comando"
**Solución**: Java no está instalado o no está en el PATH.
- Instala Java JDK 17 siguiendo las instrucciones en el README.md
- Verifica la instalación: `java -version`

### Error: "Puerto 8080 ya en uso"
**Solución**: Otro programa está usando el puerto 8080.
1. Abre el archivo `src/main/resources/application.properties`
2. Cambia la línea `server.port=8080` por `server.port=8081`
3. Reinicia la aplicación
4. Accede a http://localhost:8081/swagger-ui.html

### Error: "No se puede compilar el proyecto"
**Posibles causas y soluciones**:
1. No tienes conexión a internet (Maven necesita descargar dependencias)
   - Solución: Conéctate a internet y vuelve a intentar
2. Java no está correctamente configurado
   - Solución: Verifica JAVA_HOME como se explica en el README.md
3. El archivo pom.xml está corrupto
   - Solución: Vuelve a descargar el proyecto

### La aplicación inicia pero Swagger no carga
**Solución**: Spring Boot necesita unos segundos para inicializar completamente.
- Espera 10-15 segundos después del mensaje de inicio
- Recarga la página en el navegador (F5)
- Verifica que la URL sea correcta: http://localhost:8080/swagger-ui.html

### Error 404 al acceder a un endpoint
**Posibles causas**:
1. La URL está mal escrita
   - Verifica que sea: http://localhost:8080/api/users (no olvides /api)
2. La aplicación no está corriendo
   - Verifica que ves el mensaje de inicio en la consola
3. Estás usando el puerto incorrecto
   - Verifica en application.properties qué puerto estás usando

---

## Recursos Adicionales

### Documentación Oficial
- **Spring Boot**: https://spring.io/projects/spring-boot
- **Spring Web (REST)**: https://spring.io/guides/gs/rest-service/
- **Swagger/OpenAPI**: https://swagger.io/docs/

### Tutoriales y Guías
- **REST API Tutorial**: https://restfulapi.net/
- **HTTP Status Codes**: https://httpstatuses.com/
- **JSON**: https://www.json.org/json-es.html

### Herramientas Útiles
- **Postman**: https://www.postman.com/ - Cliente REST gráfico
- **Insomnia**: https://insomnia.rest/ - Alternativa a Postman
- **JSON Formatter**: https://jsonformatter.org/ - Para formatear/validar JSON

---

## Próximos Pasos para Ampliar tus Conocimientos

Cuando domines este proyecto básico, puedes:

1. **Añadir validaciones**: Aprende a usar `@Valid`, `@NotNull`, `@Email`, etc.
2. **Conectar una base de datos**: Implementa H2 (en memoria) o PostgreSQL
3. **Usar Spring Data JPA**: Simplifica el acceso a datos
4. **Manejo de excepciones**: Crea respuestas de error personalizadas con `@ExceptionHandler`
5. **Seguridad**: Añade autenticación con Spring Security y JWT
6. **Tests**: Escribe tests unitarios con JUnit y Mockito
7. **Documentación avanzada**: Personaliza Swagger con más detalles
8. **Logging**: Implementa logging estructurado con SLF4J
9. **Profiles**: Configura diferentes ambientes (dev, test, prod)
10. **Dockerizar**: Crea un Dockerfile para containerizar la aplicación

---

**Desarrollado con fines educativos - Aprende REST APIs paso a paso**
