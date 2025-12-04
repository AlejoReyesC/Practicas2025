package com.example.restapidemo.controller;

import com.example.restapidemo.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar usuarios
 * Este controlador maneja todas las peticiones HTTP relacionadas con usuarios
 */
@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "API para gestionar usuarios")
public class UserController {
    
    // Simulamos una base de datos en memoria con una lista
    private final List<User> users = new ArrayList<>();
    private Long nextId = 1L;
    
    // Constructor que inicializa algunos usuarios de ejemplo
    public UserController() {
        users.add(new User(nextId++, "Juan Pérez", "juan@example.com", 30));
        users.add(new User(nextId++, "María García", "maria@example.com", 25));
        users.add(new User(nextId++, "Carlos López", "carlos@example.com", 35));
    }
    
    /**
     * GET - Obtener todos los usuarios
     */
    @GetMapping
    @Operation(
        summary = "Obtener todos los usuarios",
        description = "Retorna una lista con todos los usuarios registrados en el sistema"
    )
    @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(users);
    }
    
    /**
     * GET - Obtener un usuario por ID
     */
    @GetMapping("/{id}")
    @Operation(
        summary = "Obtener un usuario por ID",
        description = "Retorna la información de un usuario específico basándose en su ID"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<User> getUserById(
            @Parameter(description = "ID del usuario a buscar", required = true)
            @PathVariable Long id) {
        
        Optional<User> user = users.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst();
        
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * GET - Buscar usuarios por nombre*/
    @GetMapping("/search")
    @Operation(
        summary = "Buscar usuarios por nombre",
        description = "Busca usuarios cuyo nombre contenga el texto especificado (case-insensitive)"
    )
    @ApiResponse(responseCode = "200", description = "Búsqueda realizada exitosamente")
    public ResponseEntity<List<User>> searchUsersByName(
            @Parameter(description = "Texto a buscar en el nombre del usuario")
            @RequestParam(required = false) String nombre) {
        
        if (nombre == null || nombre.trim().isEmpty()) {
            return ResponseEntity.ok(users);
        }
        
        List<User> filteredUsers = users.stream()
                .filter(u -> u.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                .toList();
        
        return ResponseEntity.ok(filteredUsers);
    }
    
    /**
     * POST - Crear un nuevo usuario
     */
    @PostMapping
    @Operation(
        summary = "Crear un nuevo usuario",
        description = "Crea un nuevo usuario en el sistema. El ID se asigna automáticamente."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Usuario creado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de usuario inválidos")
    })
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setId(nextId++);
        users.add(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    /**
     * PUT - Actualizar un usuario existente
     */
    @PutMapping("/{id}")
    @Operation(
        summary = "Actualizar un usuario",
        description = "Actualiza la información completa de un usuario existente"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Usuario actualizado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<User> updateUser(
            @Parameter(description = "ID del usuario a actualizar", required = true)
            @PathVariable Long id,
            @RequestBody User updatedUser) {
        
        Optional<User> existingUser = users.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst();
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setNombre(updatedUser.getNombre());
            user.setEmail(updatedUser.getEmail());
            user.setEdad(updatedUser.getEdad());
            return ResponseEntity.ok(user);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    /**
     * DELETE - Eliminar un usuario
     */
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Eliminar un usuario",
        description = "Elimina un usuario del sistema basándose en su ID"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Usuario eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "ID del usuario a eliminar", required = true)
            @PathVariable Long id) {
        
        boolean removed = users.removeIf(u -> u.getId().equals(id));
        
        if (removed) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }
}
