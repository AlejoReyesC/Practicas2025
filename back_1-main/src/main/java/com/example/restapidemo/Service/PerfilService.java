package com.example.restapidemo.service;

import com.example.restapidemo.model.Perfil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PerfilService {

    private final List<Perfil> perfiles = new ArrayList<>();
    private Long nextId = 1L;

    public PerfilService() {
        perfiles.add(new Perfil(nextId++, "Administrador", "Acceso total"));
        perfiles.add(new Perfil(nextId++, "Empleado", "Acceso operativo"));
        perfiles.add(new Perfil(nextId++, "Invitado", "Solo lectura"));
    }

    public List<Perfil> findAll() {
        return perfiles;
    }

    public Optional<Perfil> findById(Long id) {
        return perfiles.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    public List<Perfil> searchByNombre(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return perfiles;
        }
        return perfiles.stream()
                .filter(p -> p.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                .toList();
    }

    public Perfil create(Perfil perfil) {
        perfil.setId(nextId++);
        perfiles.add(perfil);
        return perfil;
    }

    public Optional<Perfil> update(Long id, Perfil data) {
        return findById(id).map(perfil -> {
            perfil.setNombre(data.getNombre());
            perfil.setDescripcion(data.getDescripcion());
            return perfil;
        });
    }

    public boolean delete(Long id) {
        return perfiles.removeIf(p -> p.getId().equals(id));
    }
}
