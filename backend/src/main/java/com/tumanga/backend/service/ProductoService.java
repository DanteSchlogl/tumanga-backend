package com.tumanga.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tumanga.backend.model.Producto;
import com.tumanga.backend.repository.ProductoRepository;

@Service
public class ProductoService {
    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Producto buscar(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Producto guardar(Producto p) {
        return repo.save(p);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}