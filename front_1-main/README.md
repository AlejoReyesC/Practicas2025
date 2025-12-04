# 🎓 Tutorial ExtJS - CRUD con REST API

Este proyecto es una aplicación educativa que demuestra cómo crear un CRUD completo en ExtJS con llamadas a servicios REST.

## 📋 Descripción

Aplicación web que permite gestionar usuarios (crear, leer, actualizar y eliminar) conectándose a un servicio REST backend.

### Características

- ✅ **CRUD Completo**
  - CREATE (POST) - Crear nuevos usuarios
  - READ (GET) - Listar y buscar usuarios
  - UPDATE (PUT) - Actualizar usuarios existentes
  - DELETE (DELETE) - Eliminar usuarios

- 🎨 **Interfaz Moderna**
  - Grid interactivo con columnas personalizadas
  - Formularios con validación
  - Iconos FontAwesome
  - Feedback visual de operaciones

- 📚 **Código Educativo**
  - Comentarios detallados en español
  - Logs en consola para cada operación
  - Estructura clara y organizada

## 🚀 Requisitos

1. **Servidor REST Backend**
   - Debe estar corriendo en `http://localhost:8080`
   - Endpoint principal: `/api/users/search`
   
2. **Navegador Web Moderno**
   - Chrome, Firefox, Edge, Safari, etc.
   - Con soporte para ES6+

## 📁 Estructura del Proyecto

```
front/
├── index.html              # Página principal
├── app.js                  # Inicialización de la aplicación
├── app/
│   ├── model/
│   │   └── User.js        # Modelo de datos de Usuario
│   ├── store/
│   │   └── Users.js       # Store con configuración REST
│   └── view/
│       ├── UserGrid.js    # Grid de usuarios (tabla)
│       └── UserForm.js    # Formulario de usuario
└── README.md              # Este archivo
```

## 🔧 Instalación y Uso

### Opción 1: Abrir directamente (recomendado para aprendizaje)

1. Asegúrate de que tu servidor REST esté corriendo en `http://localhost:8080`

2. Abre el archivo `index.html` directamente en tu navegador:
   ```
   Haz doble clic en index.html
   ```

### Opción 2: Servidor HTTP local

Si tienes problemas de CORS, usa un servidor HTTP:

**Con Python:**
```bash
# Python 3
cd front
python -m http.server 8000

# Abre: http://localhost:8000
```

**Con Node.js:**
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar
cd front
http-server -p 8000

# Abre: http://localhost:8000
```

## 📖 Guía de Aprendizaje

### 1️⃣ LEER Usuarios (GET)

Al cargar la página, automáticamente se ejecuta:

```javascript
GET http://localhost:8080/api/users/search
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
  ...
]
```

**Código relevante:** `app/store/Users.js` (líneas 30-45)

### 2️⃣ CREAR Usuario (POST)

1. Haz clic en el botón **"Nuevo Usuario"**
2. Completa el formulario
3. Haz clic en **"Guardar"**

**Petición:**
```javascript
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "nombre": "Ana García",
  "email": "ana@example.com",
  "edad": 28
}
```

**Código relevante:** `app/view/UserForm.js` (método `createUser`)

### 3️⃣ ACTUALIZAR Usuario (PUT)

1. Haz doble clic en un usuario del grid
2. Modifica los datos en el formulario
3. Haz clic en **"Guardar"**

**Petición:**
```javascript
PUT http://localhost:8080/api/users/1
Content-Type: application/json

{
  "nombre": "Juan Pérez Modificado",
  "email": "juan.nuevo@example.com",
  "edad": 31
}
```

**Código relevante:** `app/view/UserForm.js` (método `updateUser`)

### 4️⃣ ELIMINAR Usuario (DELETE)

1. Haz clic en el icono de **papelera** (🗑️)
2. Confirma la eliminación

**Petición:**
```javascript
DELETE http://localhost:8080/api/users/1
```

**Código relevante:** `app/view/UserGrid.js` (método `deleteUser`)

## 🔍 Monitorear las Peticiones REST

### Opción 1: Consola del Navegador

1. Abre las **Herramientas de Desarrollo** (F12)
2. Ve a la pestaña **Console**
3. Verás logs detallados de cada operación:
   ```
   ✅ Datos cargados correctamente: 3 usuarios
   📤 POST - Creando nuevo usuario: {nombre: "Ana", ...}
   ✅ Usuario creado exitosamente
   ```

### Opción 2: Pestaña Network

1. Abre las **Herramientas de Desarrollo** (F12)
2. Ve a la pestaña **Network**
3. Realiza operaciones CRUD
4. Haz clic en cada petición para ver:
   - Headers (cabeceras HTTP)
   - Payload (datos enviados)
   - Response (respuesta del servidor)

## 🎯 Conceptos Clave de ExtJS

### Model (Modelo)
Define la estructura de datos:
```javascript
Ext.define('Tutorial.model.User', {
    extend: 'Ext.data.Model',
    fields: ['id', 'nombre', 'email', 'edad']
});
```

### Store (Almacén)
Gestiona la colección de datos y las peticiones REST:
```javascript
Ext.define('Tutorial.store.Users', {
    extend: 'Ext.data.Store',
    model: 'Tutorial.model.User',
    proxy: {
        type: 'rest',
        url: 'http://localhost:8080/api/users'
    }
});
```

### Grid (Tabla)
Componente visual para mostrar datos en forma de tabla:
```javascript
Ext.create('Ext.grid.Panel', {
    store: usersStore,
    columns: [...]
});
```

### Form (Formulario)
Permite capturar y validar datos del usuario:
```javascript
Ext.create('Ext.form.Panel', {
    items: [
        {xtype: 'textfield', name: 'nombre'},
        {xtype: 'textfield', name: 'email'}
    ]
});
```

## 🛠️ Configuración del Backend

Tu servicio REST debe implementar los siguientes endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users/search` | Listar todos los usuarios |
| POST | `/api/users` | Crear nuevo usuario |
| PUT | `/api/users/{id}` | Actualizar usuario |
| DELETE | `/api/users/{id}` | Eliminar usuario |

### Ejemplo de respuestas esperadas:

**GET /api/users/search**
```json
[
  {"id": 1, "nombre": "Juan", "email": "juan@example.com", "edad": 30}
]
```

**POST /api/users** (201 Created)
```json
{"id": 4, "nombre": "Ana", "email": "ana@example.com", "edad": 28}
```

**PUT /api/users/1** (200 OK)
```json
{"id": 1, "nombre": "Juan Actualizado", "email": "juan@example.com", "edad": 31}
```

**DELETE /api/users/1** (204 No Content o 200 OK)

## 🐛 Solución de Problemas

### Error: CORS

**Problema:** La consola muestra errores de CORS

**Solución:** Configura tu backend para permitir peticiones desde el origen del frontend:

```java
// Spring Boot
@CrossOrigin(origins = "*")
@RestController
public class UserController { ... }
```

### No se cargan los datos

**Problema:** El grid está vacío

**Verificar:**
1. ¿El servidor REST está corriendo? → `http://localhost:8080/api/users/search`
2. ¿La consola muestra errores?
3. ¿La pestaña Network muestra la petición?

### Error 404

**Problema:** Las peticiones devuelven 404

**Solución:** Verifica que las URLs en `app/store/Users.js` coincidan con tu backend

## 📚 Recursos Adicionales

- [Documentación oficial de ExtJS](https://docs.sencha.com/extjs/7.6.0/)
- [ExtJS Kitchen Sink (ejemplos)](https://examples.sencha.com/extjs/7.6.0/examples/kitchensink/)
- [Tutorial de REST API](https://www.restapitutorial.com/)

## 💡 Ejercicios Propuestos

1. **Agregar validación de edad mínima** (18 años)
2. **Implementar un campo de teléfono** en el modelo y formulario
3. **Añadir paginación real** en el servidor
4. **Crear un filtro por rango de edad**
5. **Agregar exportación a CSV/Excel**

## 🤝 Contribuir

Este es un proyecto educativo. Siéntete libre de modificarlo y experimentar.

## 📄 Licencia

Proyecto educativo de uso libre.

---

**¡Feliz aprendizaje! 🚀**

Si tienes dudas, revisa los comentarios en el código fuente - están ahí para ayudarte a entender cada paso.
