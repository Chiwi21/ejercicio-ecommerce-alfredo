# Ecommerce JS — Alfredo Chiguano

Ejercicio de **JavaScript** con una lista de productos, carrito de compras y cálculo del
**precio total en tiempo real**. Es un proyecto 100 % front-end: no usa backend, frameworks
ni proceso de compilación.

## Funcionalidades

- Lista de 6 productos con nombre, precio y botón **Añadir al carrito**.
- Carrito con el **nombre de cada producto agregado**, precio unitario, cantidad y subtotal.
- **Precio total** y número de artículos calculados automáticamente con JavaScript.
- Botones para aumentar o disminuir la cantidad, eliminar un producto y vaciar el carrito.
- El carrito se guarda en `localStorage`, por lo que se conserva al recargar la página.
- Diseño responsive con CSS propio.
- JavaScript moderno: solo `const` y `let` (sin `var`).

## Estructura del proyecto

```text
Ejercicio Ecommerce - Alfredo Chiguano/
├── index.html   # Estructura, catálogo y carrito
├── styles.css   # Diseño responsive
├── app.js       # Lógica del carrito y suma de precios
└── README.md
```

## Ejecutar localmente

Puedes abrir `index.html` directamente en el navegador. También puedes levantar un servidor
estático desde la carpeta del proyecto:

```powershell
python -m http.server 5500
```

Luego visita `http://localhost:5500`.

## Cómo funciona

1. Cada tarjeta de producto guarda su `id`, `nombre` y `precio` en atributos `data-*`.
2. Al pulsar **Añadir al carrito**, `app.js` agrega el producto al arreglo del carrito o
   incrementa su cantidad si ya existe.
3. El carrito se renderiza con un `<template>` de HTML y se recalcula el total con `reduce`.
4. El estado se guarda en `localStorage` con la clave `ecommerce-cart-alfredo-chiguano`.

## Despliegue en Vercel

1. Subir esta carpeta a un repositorio de GitHub (los archivos deben quedar en la raíz).
2. En [Vercel](https://vercel.com), entrar con GitHub y elegir **Add New → Project**.
3. Importar el repositorio.
4. Configurar:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** vacío
   - **Output Directory:** vacío (por defecto)
   - **Environment Variables:** ninguna
5. Pulsar **Deploy** y esperar la URL pública.

**Link de Vercel:** _(pendiente de publicar)_

## Autor

**Alfredo Chiguano** — Ejercicio de JavaScript, Ingeniería Web.
