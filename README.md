# Punto y Trama

Web estática lista para GitHub y Cloudflare Pages. No requiere instalar dependencias ni compilar.

## Subir a GitHub

1. Descomprimí este ZIP.
2. Subí su contenido a la raíz del repositorio, conservando la carpeta `assets`.
3. `index.html` debe quedar directamente en la raíz. No subas el ZIP como único archivo.

## Conectar con Cloudflare Pages

Creá un proyecto de Pages conectado al repositorio de GitHub. Configuración:

- Rama de producción: la que uses para publicar (por ejemplo, `main`).
- Framework preset: `None`.
- Build command: `exit 0`.
- Build output directory: `.` (raíz del repositorio).
- Root directory: dejar vacío.
- Variables de entorno: ninguna.

Esta configuración corresponde a Cloudflare Pages; no requiere un comando de despliegue de Workers.

Documentación oficial: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Editar

- `index.html`: inicio, talleres, equipo, cumpleaños y contacto.
- `workshops.html`: workshops.
- `styles.css` y `craft.css`: diseño.
- `app.js`: menú, selector de consulta y animaciones.
- `assets/`: fotos, ilustraciones, texturas y fuentes locales, con sus licencias.

Para ver la web localmente: `python -m http.server 4173` y abrir http://localhost:4173.

Las modificaciones que publiques en la rama conectada se desplegarán mediante la integración con GitHub.

El paquete no contiene documentos internos, presupuestos ni fotografías originales ajenas a los recursos web.
