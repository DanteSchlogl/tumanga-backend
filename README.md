Tecnologías usadas
Back-end: Java 17 + Spring Boot + MySQL
Front-end: HTML, CSS, JavaScript puro
Despliegue: GitHub Pages (front) + Render/Heroku (back)
⚙️ Instalación y puesta en marcha local
1. Clona el repositorio
bash
Copy
git clone https://github.com/DanteSchlogl/tumanga-backend.git
cd tumanga-backend
2. Configura la base de datos MySQL
sql
Copy
CREATE DATABASE tumanga_db;
3. Ajusta la conexión en application.properties
properties
Copy
spring.datasource.url=jdbc:mysql://localhost:3306/tumanga_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_contraseña
4. Ejecuta el back-end
bash

./mvnw spring-boot:run   # Windows: mvnw.cmd
El servidor arranca en:
👉 http://localhost:8080
🚀 Cómo usar la app
Table
Copy
Acción	Método HTTP	Endpoint	Ejemplo
Ver productos	GET	/api/productos	Abre catalogo.html
Agregar producto	POST	/api/productos	Body JSON
Crear pedido	POST	/api/pedidos	Body JSON
Ver pedidos por cliente	GET	/api/pedidos/cliente/{nombre}	/cliente/Ana
📁 Estructura del proyecto
Copy
backend/
 ├─ src/main/java/com/tumanga/
 │   ├─ model/          # Entidades JPA
 │   ├─ repository/     # Interfaces Spring Data
 │   ├─ service/        # Lógica de negocio
 │   └─ controller/     # Endpoints REST
 └─ application.properties
🌐 Despliegue
Front-end (GitHub Pages)
Sube el front a otro repositorio.
Activa GitHub Pages en Settings → Pages → Branch main /root.
Listo: https://<usuario>.github.io/tu-manga-frontend/
Back-end (opcional gratis)
Render.com o Railway.app
Sube el repo y vincula la base de datos MySQL externa.
🤝 Contribuciones
Haz un fork
Crea tu rama (git checkout -b feature/xyz)
Commit + push
Abre un Pull Request
