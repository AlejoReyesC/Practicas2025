# REST API Demo - Proyecto de Aprendizaje

Este es un proyecto educativo para aprender a crear servicios REST con Spring Boot y documentarlos con Swagger.

## Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Web** - para crear servicios REST
- **Swagger/OpenAPI 3** - para documentación interactiva
- **Lombok** - para reducir código boilerplate
- **Maven** - para gestión de dependencias

## Instalación desde Cero

### Paso 1: Instalar Java JDK 17

#### En Windows:
1. Descarga Java JDK 17 desde: https://adoptium.net/
2. Ejecuta el instalador descargado
3. Sigue el asistente de instalación (usa las opciones por defecto)
4. Verifica la instalación abriendo una terminal y ejecutando:
   ```bash
   java -version
   ```
   Deberías ver algo como: `openjdk version "17.0.x"`

#### En Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install openjdk-17-jdk
java -version
```

#### En macOS:
```bash
brew install openjdk@17
java -version
```

### Paso 2: Configurar JAVA_HOME (solo si es necesario)

#### En Windows:
1. Busca "Variables de entorno" en el menú de inicio
2. Haz clic en "Variables de entorno"
3. En "Variables del sistema", haz clic en "Nueva"
4. Nombre: `JAVA_HOME`
5. Valor: la ruta donde instalaste Java (ej: `C:\Program Files\Eclipse Adoptium\jdk-17.0.x`)
6. Haz clic en "Aceptar"
7. Edita la variable "Path" y añade: `%JAVA_HOME%\bin`

#### En Linux/macOS:
Añade al archivo `~/.bashrc` o `~/.zshrc`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```
Luego ejecuta: `source ~/.bashrc` o `source ~/.zshrc`

### Paso 3: Instalar Maven (Opcional)

Este proyecto incluye Maven Wrapper, por lo que no es obligatorio instalar Maven. Sin embargo, si quieres instalarlo:

#### En Windows:
1. Descarga Maven desde: https://maven.apache.org/download.cgi
2. Extrae el archivo zip en una carpeta (ej: `C:\Program Files\Apache\maven`)
3. Añade Maven al PATH:
   - Variables de entorno > Path > Nuevo
   - Añade: `C:\Program Files\Apache\maven\bin`
4. Verifica: `mvn -version`

#### En Linux (Ubuntu/Debian):
```bash
sudo apt install maven
mvn -version
```

#### En macOS:
```bash
brew install maven
mvn -version
```

### Paso 4: Descargar o Clonar el Proyecto

Si tienes el proyecto en Git:
```bash
git clone <url-del-repositorio>
cd back
```

Si descargaste el proyecto como ZIP:
1. Extrae el archivo en una carpeta
2. Abre una terminal en esa carpeta

### Paso 5: Compilar el Proyecto

#### Con Maven instalado:
```bash
mvn clean install
```

#### Con Maven Wrapper (Windows):
```bash
.\mvnw.cmd clean install
```

#### Con Maven Wrapper (Linux/macOS):
```bash
./mvnw clean install
```

### Paso 6: Ejecutar la Aplicación

#### Con Maven instalado:
```bash
mvn spring-boot:run
```

#### Con Maven Wrapper (Windows):
```bash
.\mvnw.cmd spring-boot:run
```

#### Con Maven Wrapper (Linux/macOS):
```bash
./mvnw spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

## Documentación Swagger

Una vez iniciada la aplicación, puedes acceder a la documentación interactiva:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs

Desde Swagger UI podrás:
- Ver todos los endpoints disponibles
- Probar cada endpoint directamente desde el navegador
- Ver ejemplos de request y response
- Ver la documentación de cada parámetro

## Endpoints Disponibles

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Obtener todos los usuarios |
| GET | `/api/users/{id}` | Obtener un usuario por ID |
| GET | `/api/users/search?nombre={nombre}` | Buscar usuarios por nombre |
| POST | `/api/users` | Crear un nuevo usuario |
| PUT | `/api/users/{id}` | Actualizar un usuario |
| DELETE | `/api/users/{id}` | Eliminar un usuario |

## Ejemplos de Uso

### GET - Obtener todos los usuarios
```bash
curl http://localhost:8080/api/users
```

### GET - Obtener usuario por ID
```bash
curl http://localhost:8080/api/users/1
```

### GET - Buscar usuarios por nombre
```bash
curl http://localhost:8080/api/users/search?nombre=Juan
```

### POST - Crear un nuevo usuario
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Torres",
    "email": "ana@example.com",
    "edad": 28
  }'
```

### PUT - Actualizar un usuario
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez Actualizado",
    "email": "juan.nuevo@example.com",
    "edad": 31
  }'
```

### DELETE - Eliminar un usuario
```bash
curl -X DELETE http://localhost:8080/api/users/1
```

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/
│   │   └── com/example/restapidemo/
│   │       ├── RestApiDemoApplication.java    # Clase principal
│   │       ├── config/
│   │       │   └── OpenApiConfig.java         # Configuración Swagger
│   │       ├── controller/
│   │       │   └── UserController.java        # Controlador REST
│   │       └── model/
│   │           └── User.java                  # Modelo de datos
│   └── resources/
│       └── application.properties             # Configuración
```

## Conceptos Clave para Aprender

1. **@RestController**: Marca una clase como controlador REST
2. **@RequestMapping**: Define la ruta base del controlador
3. **@GetMapping**: Maneja peticiones HTTP GET
4. **@PostMapping**: Maneja peticiones HTTP POST
5. **@PutMapping**: Maneja peticiones HTTP PUT
6. **@DeleteMapping**: Maneja peticiones HTTP DELETE
7. **@PathVariable**: Extrae valores de la URL
8. **@RequestParam**: Extrae parámetros de consulta
9. **@RequestBody**: Extrae el cuerpo de la petición
10. **ResponseEntity**: Permite controlar el código de estado HTTP

## Solución de Problemas Comunes

### Error: "java no se reconoce como comando"
**Causa**: Java no está instalado o no está en el PATH

**Solución**:
1. Instala Java JDK 17 siguiendo el "Paso 1" de este README
2. Configura JAVA_HOME siguiendo el "Paso 2"
3. Reinicia la terminal y verifica: `java -version`

### Error: "mvn no se reconoce como comando"
**Causa**: Maven no está instalado (pero no es necesario si usas Maven Wrapper)

**Solución**:
- Usa Maven Wrapper en su lugar: `.\mvnw.cmd` (Windows) o `./mvnw` (Linux/macOS)
- O instala Maven siguiendo el "Paso 3"

### Error: "Puerto 8080 ya en uso"
**Causa**: Otro programa está usando el puerto 8080

**Solución**: 
Cambia el puerto en `src/main/resources/application.properties`:
```properties
server.port=8081
```

### Error: "No se encuentra el archivo pom.xml"
**Causa**: No estás en la carpeta correcta del proyecto

**Solución**: 
Navega a la carpeta raíz del proyecto donde está el archivo `pom.xml`
```bash
cd ruta/al/proyecto/back
```

### La aplicación inicia pero Swagger no carga
**Causa**: Spring Boot aún está inicializando

**Solución**: 
Espera 10-15 segundos después de que aparezca el mensaje de inicio y recarga la página

## Próximos Pasos para Aprender

Una vez que domines este proyecto básico, puedes expandirlo:

1. Añadir validación de datos con `@Valid` y Bean Validation
2. Implementar una base de datos real (H2, PostgreSQL, MySQL)
3. Añadir Spring Data JPA para persistencia
4. Implementar manejo de excepciones personalizado con `@ExceptionHandler`
5. Añadir seguridad con Spring Security
6. Implementar tests unitarios con JUnit y Mockito
7. Añadir tests de integración con `@SpringBootTest`

## Recursos de Aprendizaje

- **Documentación oficial de Spring Boot**: https://spring.io/projects/spring-boot
- **Guía de Spring REST**: https://spring.io/guides/gs/rest-service/
- **Documentación de Swagger/OpenAPI**: https://swagger.io/docs/
- **Tutorial de REST APIs**: https://restfulapi.net/

## Soporte

Para más información, consulta el archivo `GUIA_INICIO_RAPIDO.md` que contiene ejemplos detallados y ejercicios prácticos.

---


