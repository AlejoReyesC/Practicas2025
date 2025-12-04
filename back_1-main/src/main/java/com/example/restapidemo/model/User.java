package com.example.restapidemo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Modelo de datos para un Usuario
 * Representa la información básica de un usuario
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private Long id;
    private String nombre;
    private String email;
    private int edad;

}
