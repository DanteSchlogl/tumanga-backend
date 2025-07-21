package com.tumanga.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tumanga.backend.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByCliente(String cliente);
}
