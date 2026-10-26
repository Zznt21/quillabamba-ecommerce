# Raíces de Quillabamba — MVP 1.4

Tienda demo de café y miel artesanal de Quillabamba (React, Vite, Tailwind CSS 4).

## Requisitos
Node.js 22.12+ de la rama 22.x y npm (Vercel configurado para 22.x).

## Iniciar
```bash
npm install
npm run dev
```
Abre la URL local mostrada por Vite (habitualmente http://localhost:5173).

## Compilar
```bash
npm run build
npm run preview
```

## Beta pública

La beta está activa por defecto: permite probar el carrito, pero bloquea consultas reales por WhatsApp. La integración permanece disponible al configurar `VITE_BETA_MODE=false` y recompilar. Consulta [DEPLOYMENT.md](./DEPLOYMENT.md) para GitHub → Vercel, fallback SPA y variables de entorno. No se ha publicado el proyecto.

## Antes de habilitar ventas reales
1. Verifica el número comercial configurado en `src/data/products.js`: `51940806346`. Fuera del modo beta, las consultas abren WhatsApp en la misma pestaña; el cliente debe enviar el mensaje.
2. Reemplaza productos, precios, pesos, descripciones e imágenes demostrativas en `src/data/products.js`.
3. Sustituye el nombre de marca provisional y la historia por contenido real verificado.
4. Añade políticas de privacidad, venta, devolución y despacho; define zonas y tarifas de envío.
5. Usa imágenes propias o con licencia adecuada. Las imágenes externas de Unsplash requieren conexión y pueden cambiar.
6. Este MVP NO procesa pagos, no valida inventario y NO registra pedidos en base de datos. WhatsApp solo prepara el mensaje; el usuario debe enviarlo.

## Rutas
- `/` Inicio
- `/catalogo` Catálogo con filtros
- `/producto/:id` Detalle
- `/carrito` Carrito persistente
- `/nosotros` Historia
- `/mayoristas` Consulta mayorista

## Verificación MVP 1.1

Ejecuta `npm test` para las pruebas ligeras con Node.js, sin dependencias nuevas. Cubren validación del carrito, cálculos en céntimos, serialización y almacenamiento simulado, búsqueda, mensajes de WhatsApp y correspondencia de rutas declaradas.

Ejecuta `npm run build` para compilar. Las pruebas no sustituyen la revisión manual de teclado, foco, consola, sincronización entre pestañas reales ni envío de mensajes desde WhatsApp.

El carrito mantiene la clave `quillabamba-cart-v1` para conservar selecciones existentes. Los errores de lectura, escritura y sincronización se informan al usuario; sin acceso a localStorage la compra puede continuar en memoria.

## Dirección visual MVP 1.2

Portada editorial, categorías asimétricas, ilustración botánica y paisaje interpretativo. Se conserva la lógica comercial de MVP 1.1. No se midió capacidad para 100 visitantes simultáneos.

Las imágenes locales WebP tienen variantes pequeñas y `srcset`. Son fotografías referenciales de categorías, no de los envases reales ni de productores identificados. Proceden de las imágenes Unsplash ya usadas en la demo:
- Café: https://images.unsplash.com/photo-1447933601403-0c6688de566e.
- Miel: https://images.unsplash.com/photo-1587049352851-8d4e89133924.

Antes de publicar comercialmente: incorporar fotografías propias o verificar licencia y atribución de las definitivas. El paisaje es una ilustración decorativa, no un mapa ni una fotografía de Quillabamba.

Pendiente: comprobación visual y de teclado en navegador a 375, 768, 1024 y 1440 px. La herramienta de navegador no completó su autorización durante esta sesión.


## Accesibilidad móvil MVP 1.3

Menú desplegable bajo 768 px con botón nativo, `aria-expanded`, enlaces fuera del recorrido de Tab cuando está cerrado, cierre mediante Escape y restauración del foco. El cambio de ruta conserva la gestión de foco existente.

Controles de cantidad, carrito, cierre del toast y navegación con objetivos de al menos 44 px. Se redujeron mínimos intrínsecos de columnas y se permite partir textos largos sin ocultar el desbordamiento global. El toast reserva espacio inferior, respeta el área segura del dispositivo y recoloca el control enfocado si coincide con el aviso. Su estado y temporizador siguen en CartContext.

Se conservaron las 15 pruebas existentes, la paleta y las reglas de movimiento reducido; no se añadieron dependencias. Revisión CSS estática para los tramos de 375, 768, 1024 y 1440 px. Pendiente comprobación real en esas resoluciones, menú con teclado y lector de pantalla, teclado virtual, desbordamientos y posición del toast: no hay una conexión de navegador utilizable en esta sesión.

## Refinamiento visual MVP 1.4

Nueva paleta centralizada en `src/colors.css`: crema #F1E7D5 como fondo, café profundo #493325 en textos y botones, oliva #68754B en botánica, miel #C99542 en detalles y tierra suave #B58B67 en bordes. Variantes claras para superficies y variantes oscuras de oliva/miel para texto pequeño. Origen, anuncio superior y pie de página usan superficies luminosas. Las fotografías locales se mantienen sin modificación.

`Icon.jsx` reutiliza Lucide, ya instalado: SVG de trazo 1.5, `currentColor`, `aria-hidden` y `focusable=false`. Flechas, suma/resta, cierre y asterisco dejaron de depender de caracteres Unicode. Menú, carrito y búsqueda comparten el mismo estilo. Los controles conservan sus etiquetas accesibles y mínimos táctiles existentes.

Pruebas añadidas para contraste AA de tokens y prevención de símbolos de interfaz Unicode. No se cambiaron cálculos, carrito, localStorage, temporizador del toast, WhatsApp, beta ni configuración Vercel. Sin nuevas dependencias.

Pendiente: validación visual y de interacción en Safari iOS, Chrome Android y escritorio a 375, 768, 1024 y 1440 px. La revisión realizada es de código y contraste calculado, no una validación en dispositivos reales.
