package com.example.restapidemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

/**
 * Configuración de CORS (Cross-Origin Resource Sharing)
 * Permite que aplicaciones desde otros orígenes (puertos/dominios) puedan
 * acceder a esta API
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Permitir credenciales (cookies, headers de autenticación, etc.)
        config.setAllowCredentials(true);

        // Permitir acceso desde el puerto 8000 (tu aplicación frontend)
        config.addAllowedOrigin("http://localhost:8000");

        // También puedes agregar otros orígenes si es necesario
        // config.addAllowedOrigin("http://localhost:3000");
        // config.addAllowedOrigin("http://localhost:4200");

        // Permitir todos los headers
        config.addAllowedHeader("*");

        // Permitir todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
        config.addAllowedMethod("*");

        // Tiempo en segundos que el navegador puede cachear la respuesta preflight
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicar esta configuración a todos los endpoints
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
