let carrito = [];
let total = 0;

function agregarAlCarrito(titulo, precio) {
    // Agregar producto al carrito
    const producto = { titulo, precio };
    carrito.push(producto);

    // Actualizar total
    total += precio;

    // Mostrar carrito actualizado
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = ''; // Limpiar contenido previo

    // Mostrar cada producto en el carrito
    carrito.forEach((producto, index) => {
        const divProducto = document.createElement('div');
        divProducto.innerHTML = `
            ${producto.titulo} - $${producto.precio} 
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        carritoDiv.appendChild(divProducto);
    });

    // Actualizar total en la interfaz
    document.getElementById('total').innerText = total;
}

function eliminarDelCarrito(index) {
    // Restar el precio del producto eliminado del total
    total -= carrito[index].precio;

    // Eliminar producto del carrito
    carrito.splice(index, 1);

    // Mostrar carrito actualizado
    mostrarCarrito();
}