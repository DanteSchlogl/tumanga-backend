package com.tumanga.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tumanga.backend.model.Pedido;
import com.tumanga.backend.repository.PedidoRepository;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {
    private final PedidoRepository repo;

    public PedidoController(PedidoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Pedido> listar() {
        return repo.findAll();
    }

    @GetMapping("/cliente/{cliente}")
    public List<Pedido> porCliente(@PathVariable String cliente) {
        return repo.findByCliente(cliente);
    }

    @PostMapping
    public Pedido crear(@RequestBody Pedido p) {
        p.setFecha(java.time.LocalDateTime.now());
        p.setEstado("pendiente");
        return repo.save(p);
    }
}
