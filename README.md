# Priotti Concept - Tienda Online

Este proyecto es una tienda online desarrollada con **React** y **Vite**, utilizando **TailwindCSS** para estilos y **Axios** para la comunicación con el backend. Permite a los usuarios navegar productos, registrarse, iniciar sesión, agregar productos al carrito y realizar compras.

## Demo online

Podés probar la tienda funcionando en:

[https://priotticoncept.netlify.app/](https://priotticoncept.netlify.app/)

## Características

- Catálogo de productos con imágenes, categorías y detalles.
- Registro e inicio de sesión de usuarios.
- Carrito de compras persistente (con y sin sesión).
- Checkout y pago integrado.
- Navegación entre páginas con React Router.
- Estilos modernos con TailwindCSS.
- Notificaciones con react-hot-toast.

## Estructura del proyecto

```
src/
  components/      # Componentes reutilizables (Navbar, Footer, ProductCard, etc.)
  context/         # Contextos globales (Usuario, Carrito)
  pages/           # Páginas principales (Home, Products, Cart, Login, Register, etc.)
  services/        # Servicios de API (Axios)
  assets/          # Imágenes y recursos
```

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/front-priotticoncep.git
   cd front-priotticoncep
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

## Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Compila la aplicación para producción.
- `npm run preview` — Previsualiza la versión de producción.
- `npm run lint` — Ejecuta ESLint para analizar el código.

## Configuración

- El backend debe estar disponible en [https://priotti-concept-backend.onrender.com](https://priotti-concept-backend.onrender.com).
- El archivo [`src/services/api.js`](src/services/api.js) gestiona las llamadas a la API y la autenticación por token.

## Créditos

Desarrollado por Eric Bayona.

---
