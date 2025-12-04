package com.example.restapidemo.controller;

import com.example.restapidemo.model.Perfil;
import com.example.restapidemo.service.PerfilService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/perfiles")
@Tag(name = "Perfiles", description = "API para gestionar perfiles")
public class PerfilController {

    private final PerfilService service;

    public PerfilController(PerfilService service) {
        this.service = service;
    }

    /**
     * GET - Obtener todos los perfiles
     */
    @GetMapping
    @Operation(summary = "Obtener todos los perfiles")
    @ApiResponse(responseCode = "200", description = "Listado de perfiles obtenido correctamente")
    public ResponseEntity<List<Perfil>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    /**
     * GET - Obtener perfil por ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtener un perfil por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Perfil encontrado"),
            @ApiResponse(responseCode = "404", description = "Perfil no encontrado")
    })
    public ResponseEntity<Perfil> getById(
            @Parameter(description = "ID del perfil", required = true)
            @PathVariable Long id) {

        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET - Buscar perfiles por nombre     */
    @GetMapping("/search")
    @Operation(summary = "Buscar perfiles por nombre")
    @ApiResponse(responseCode = "200", description = "Búsqueda realizada correctamente")
    public ResponseEntity<List<Perfil>> search(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(service.searchByNombre(nombre));
    }

    /**
     * POST - Crear un nuevo perfil*/
    @PostMapping
    @Operation(summary = "Crear perfil")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Perfil creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    public ResponseEntity<Perfil> create(@RequestBody Perfil perfil) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(perfil));
    }

    /**
     * PUT - Actualizar perfil   */
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un perfil")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Perfil actualizado correctamente"),
            @ApiResponse(responseCode = "404", description = "Perfil no encontrado")
    })
    public ResponseEntity<Perfil> update(
            @Parameter(description = "ID del perfil a actualizar", required = true)
            @PathVariable Long id,
            @RequestBody Perfil perfil) {

        return service.update(id, perfil)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE - Eliminar perfil
*/
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un perfil")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Perfil eliminado correctamente"),
            @ApiResponse(responseCode = "404", description = "Perfil no encontrado")
    })
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID del perfil a eliminar", required = true)
            @PathVariable Long id) {

        return service.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
