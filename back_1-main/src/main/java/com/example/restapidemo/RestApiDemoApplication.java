package com.example.restapidemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Spring Boot
 * Esta es la clase que inicia el servidor y toda la aplicación
 */
@SpringBootApplication
public class RestApiDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestApiDemoApplication.class, args);
        System.out.println("\n===========================================");
        System.out.println("Aplicación REST API Demo iniciada!");
        System.out.println("Swagger UI: http://localhost:8080/swagger-ui.html");
        System.out.println("API Docs: http://localhost:8080/api-docs");
        System.out.println("===========================================\n");
    }
}
