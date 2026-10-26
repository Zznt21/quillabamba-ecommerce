# Desplegar la beta MVP 1.3 en Vercel

Estado: preparado localmente; no se ha creado ni publicado ningún proyecto de Vercel.

## Configuración incluida

- `vercel.json`: preset Vite, instalación `npm ci`, build `npm test && npm run build`, salida `dist` y fallback `/(.*)` a `/index.html` para BrowserRouter.
- `package.json`: Node.js `22.x`, con el lockfile sincronizado. No se añadieron dependencias.
- `.gitignore`: excluye dependencias, compilación, archivos de entorno locales y `.vercel`. El lockfile y `.env.example` sí se deben subir.
- `VITE_BETA_MODE`: valor público de compilación. La beta está activa si falta la variable o si su valor no es exactamente `false`.
- WhatsApp conserva el número `51940806346`, generación de mensajes y codificación. Durante la beta se deshabilitan los botones de carrito/mayoristas y también se bloquea su navegación desde los manejadores. El carrito, su persistencia y los formularios se pueden probar.
- El aviso de beta aparece en todas las páginas, en el flujo normal de la cabecera. Usa los tokens Tierra Andina.

El bloqueo es una prevención de envíos accidentales desde esta interfaz, no una restricción del servicio externo de WhatsApp. No se guarda ni envía una cotización al completar los campos durante la beta.

## 1. Preparar GitHub

El código actual no tiene repositorio Git inicializado. Crea un repositorio en GitHub y sube el código mediante tu flujo Git habitual; esta preparación no crea commits ni hace push.

Incluye `src`, `public`, `tests`, `index.html`, `vite.config.js`, `vercel.json`, `package.json`, `package-lock.json`, `.gitignore`, `.env.example` y la documentación. No subas `node_modules`, `dist` ni archivos `.env` locales.

Para una comprobación desde un checkout limpio, dentro de la carpeta que contiene `package.json`:

```bash
npm ci
npm test
npm run build
npm run preview
```

`npm run preview` sirve para inspeccionar la compilación local; no emula las reglas de Vercel.

## 2. Importar a Vercel cuando autorices la publicación

1. En Vercel, crea un proyecto e importa el repositorio de GitHub.
2. Selecciona la carpeta raíz de la aplicación:
   - `quilla/quilla1` si el repositorio contiene toda la carpeta de trabajo actual.
   - `quilla1` si el repositorio empieza en `quilla`.
   - `.` si el repositorio empieza directamente junto a `package.json`.
3. Preset: **Vite**. Node.js: **22.x**. El archivo `vercel.json` debe estar dentro de la raíz seleccionada.
4. Conserva los comandos declarados: instalación `npm ci`, build `npm test && npm run build`, directorio de salida `dist`. No uses `npm run dev` ni `npm run preview` como build.
5. Configura `VITE_BETA_MODE=true` para **Production** y **Preview**. Aunque se omita, el código mantiene la beta activa por defecto. No hay otras variables obligatorias ni secretos que configurar.
6. Revisa la rama de producción elegida y los ajustes de acceso antes de publicar. Si necesitas una beta pública, comprueba que su URL sea accesible sin iniciar sesión, de acuerdo con Deployment Protection.
7. Pulsa **Deploy** solo cuando decidas publicar. Después de conectar GitHub, los pushes a la rama de producción pueden generar despliegues automáticamente.

## 3. Comprobar el despliegue

- Abre directamente y recarga `/catalogo`, `/producto/cafe-grano`, `/carrito`, `/nosotros` y `/mayoristas`.
- Abre una ruta inexistente: debe mostrarse el fallback de React de página no encontrada.
- Revisa que `/assets/` y las cuatro imágenes de `/images/` respondan como archivos, no como HTML.
- Comprueba el aviso de beta, agrega/elimina productos y recarga el carrito. Revisa sincronización entre dos pestañas del mismo dominio.
- Confirma que ambos botones de WhatsApp estén deshabilitados y que no se abra WhatsApp al enviar el formulario mediante Enter.
- Revisa consola, teclado y responsive en 375, 768, 1024 y 1440 px. Estas comprobaciones visuales y del hosting todavía no se han ejecutado.

localStorage se conserva por origen: localhost, URLs Preview y el dominio de producción mantienen carritos distintos. No se cambió su clave ni su comportamiento.

## 4. Desactivar el modo beta

1. Antes de habilitar ventas, sustituye los datos demostrativos y verifica la información comercial pendiente. Cambiar la variable no convierte automáticamente los productos, precios o textos demo en una oferta real.
2. En Vercel, cambia `VITE_BETA_MODE=false` solo en el entorno que quieras habilitar. Mantén `true` en Preview mientras siga siendo de pruebas.
3. Genera un **nuevo despliegue**: Vite incorpora el valor durante la compilación. Cambiar la variable no modifica un despliegue existente.
4. En la nueva versión se oculta el aviso global de beta y se habilitan los botones existentes, con las validaciones actuales. Revisa el número y los mensajes antes de una prueba de envío intencional.
5. Para volver a bloquear consultas, establece `VITE_BETA_MODE=true` y vuelve a desplegar.

En local puedes copiar `.env.example` a `.env.local`, cambiar el valor y reiniciar Vite o recompilar. Nunca uses variables `VITE_` para secretos: forman parte del código público del navegador.

## Assets y enlaces

Las fotografías visibles se sirven desde `public/images` y se copian a `dist/images`. Las rutas absolutas `/images/...` y `/assets/...` corresponden a un despliegue en la raíz del dominio; no hace falta cambiar `base` de Vite. Las fuentes Google Fonts siguen siendo una dependencia externa, con fuentes de sistema de respaldo. Los enlaces internos mantienen React Router; WhatsApp solo se abre mediante el guard de beta.

## Referencias oficiales

- [Vite en Vercel y fallback SPA](https://vercel.com/docs/frameworks/frontend/vite).
- [Versiones Node.js en Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
- [Variables de entorno de Vercel y nuevos despliegues](https://vercel.com/docs/environment-variables).
- [Variables y modos de Vite](https://vite.dev/guide/env-and-mode).
