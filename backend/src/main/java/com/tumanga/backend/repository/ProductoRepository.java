package com.tumanga.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tumanga.backend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}