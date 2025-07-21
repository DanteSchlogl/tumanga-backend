/* ==========  MODELOS  ========== */
let productos      = JSON.parse(localStorage.getItem('productos'))      || [];
let categorias     = JSON.parse(localStorage.getItem('categorias'))     || [];
let carrito        = JSON.parse(localStorage.getItem('carrito'))        || [];
let pedidos        = JSON.parse(localStorage.getItem('pedidos'))        || [];
let usuarios       = JSON.parse(localStorage.getItem('usuarios'))       || [];
let usuarioActual  = JSON.parse(localStorage.getItem('usuarioActual'))  || null;

/* ==========  NAVEGACIÓN  ========== */
function mostrar(seccion) {
  document.querySelectorAll('.panel').forEach(p => p.classList.add('oculto'));
  document.getElementById(seccion).classList.remove('oculto');

  switch (seccion) {
    case 'gestionProductos' : pintarGestionProductos(); break;
    case 'historialPedidos' : pintarHistorial();      break;
    case 'realizarPedido'   : pintarRealizarPedido(); break;
    case 'admin'            : pintarAdmin();          break;
    case 'verCarrito'       : pintarCarrito();        break;
  }
}
function volver() { mostrar('menuPrincipal'); }
function salir()  { location.href = 'index.html'; }

/* ==========  GESTIÓN DE PRODUCTOS  ========== */
function pintarGestionProductos() {
  const div = document.getElementById('gestionProductos');
  div.innerHTML = `
    <h2>--- Gestion de Productos ---</h2>
    <button onclick="formAgregarProducto()">a) Agregar Producto</button>
    <button onclick="listarProductos()">b) Listar Productos</button>
    <button onclick="formBuscarProducto()">c) Buscar por ID</button>
    <button onclick="formActualizarProducto()">d) Actualizar Producto</button>
    <button onclick="formEliminarProducto()">e) Eliminar Producto</button>
    <button onclick="volver()">f) Volver al menú principal</button>
    <div id="subPanelProducto"></div>`;
}

function formAgregarProducto() {
  const sp = document.getElementById('subPanelProducto');
  sp.innerHTML = `
    <h3>Agregar Producto</h3>
    <input id="titulo" placeholder="Título">
    <input id="autor"  placeholder="Autor">
    <input id="anio"   placeholder="Año" type="number">
    <input id="precio" placeholder="Precio" type="number">
    <input id="stock"  placeholder="Stock" type="number">
    <input id="categoria" placeholder="Categoría">
    <button onclick="agregarProducto()">Guardar</button>`;
}

function agregarProducto() {
  const nuevo = {
    id: Date.now(),
    titulo: titulo.value,
    autor: autor.value,
    anio: Number(anio.value),
    precio: Number(precio.value),
    stock: Number(stock.value),
    categoria: categoria.value
  };
  productos.push(nuevo);
  guardar();
  alert('✅ Producto guardado');
  listarProductos();
}

function listarProductos() {
  const sp = document.getElementById('subPanelProducto');
  sp.innerHTML = '<h3>Listado de Productos</h3>';
  productos.forEach(p => {
    sp.innerHTML += `
      <p><strong>${p.titulo}</strong> - $${p.precio} - Stock: ${p.stock} - ID: ${p.id}</p>`;
  });
}

function guardar() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

/* ==========  CARRITO Y PEDIDOS  ========== */
function pintarCarrito() {
  const div = document.getElementById('verCarrito');
  div.innerHTML = `
    <h2>Carrito actual</h2>
    ${carrito.map((item, idx) => `
      <p>${item.titulo} - $${item.precio}</p>
    `).join('')}
    <button onclick="mostrar('realizarPedido')">Realizar Pedido</button>
    <button onclick="volver()">Volver</button>`;
}

function pintarRealizarPedido() {
  const div = document.getElementById('realizarPedido');
  const total = carrito.reduce((sum, i) => sum + i.precio, 0);
  div.innerHTML = `
    <h2>Confirmar Pedido</h2>
    <p>Total: $${total}</p>
    <input id="nombreCliente" placeholder="Tu nombre">
    <button onclick="confirmarPedido()">Confirmar</button>
    <button onclick="volver()">Cancelar</button>`;
}

function confirmarPedido() {
  const cliente = document.getElementById('nombreCliente').value;
  if (!cliente) return alert('Ingresá tu nombre');
  const nuevoPedido = {
    id: Date.now(),
    cliente,
    items: [...carrito],
    estado: 'pendiente',
    fecha: new Date().toLocaleString()
  };
  pedidos.push(nuevoPedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  carrito.length = 0;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('✅ Pedido realizado');
  mostrar('menuPrincipal');
}

function pintarHistorial() {
  const div = document.getElementById('historialPedidos');
  const misPedidos = pedidos.filter(p => p.cliente === usuarioActual);
  div.innerHTML = `
    <h2>Historial de Pedidos</h2>
    ${misPedidos.map(p => `
      <p>Pedido #${p.id} - Estado: ${p.estado} - Fecha: ${p.fecha}</p>
    `).join('')}
    <button onclick="volver()">Volver</button>`;
}

function pintarAdmin() {
  const div = document.getElementById('admin');
  div.innerHTML = `
    <h2>Administración</h2>
    <button onclick="verStock()">Ver Stock Bajo</button>
    <button onclick="cambiarEstadoPedido()">Cambiar Estado de Pedido</button>
    <button onclick="volver()">Volver</button>
    <div id="subAdmin"></div>`;
}

function verStock() {
  const sub = document.getElementById('subAdmin');
  const bajo = productos.filter(p => p.stock < 5);
  sub.innerHTML = '<h3>Productos con stock bajo:</h3>';
  bajo.forEach(p => sub.innerHTML += `<p>${p.titulo} - Stock: ${p.stock}</p>`);
}