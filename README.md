# Demo Sistema de Nomina - Tornillos MX

Prototipo funcional de interfaz para gestion de nomina. Proyecto academico con altas, edicion, bajas, consultas, filtros, roles y persistencia local.

## Demo en linea

https://bstcmx.github.io/demo-sistema-nomina/

## Requisitos

- Node.js 20.19 o superior (solo en este proyecto, ver abajo)
- npm

### Node local sin cambiar la version global

Este repo incluye `.nvmrc`. Si usas nvm:

```bash
cd DIIS_U3_A3_JOLC
nvm install    # instala 20.19.5 si no la tienes; no cambia el default global
nvm use        # activa Node 20 solo en esta terminal
node -v        # debe mostrar v20.19.5
npm install
```

No ejecutes `nvm alias default` a menos que quieras cambiar Node en todo el sistema. Con `nvm use` basta al trabajar aqui.

## Uso local

```bash
npm install
npm run dev
```

Abrir la URL que muestra Vite (normalmente http://localhost:5173/demo-sistema-nomina/).

## Build

```bash
npm run build
npm run preview
```

## Persistencia de datos

Los empleados se guardan en `localStorage` del navegador. No hay base de datos en el servidor.

## Despliegue

El proyecto usa GitHub Actions para publicar en GitHub Pages al hacer push a `main`.

Repositorio: https://github.com/BSTCMX/demo-sistema-nomina

## Licencia

MIT
