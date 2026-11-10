# Geometry Dash Web (`geometrydashdotcom`)

[Español](#español) · [English](#english)

---

## Español

### Índice

- [Descripción](#descripción)
- [Características](#características)
- [Requisitos](#requisitos)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Aviso legal](#aviso-legal)
- [Licencia](#licencia)

### Descripción

Versión web no oficial de **Geometry Dash** que permite jugar niveles directamente en el navegador. El proyecto está basado en el trabajo original de [lasokar/geometrydashdotcom](https://github.com/lasokar/geometrydashdotcom), que adaptó los recursos del juego original a HTML5 y JavaScript.

Este fork mantiene la misma base jugable y sirve como copia de estudio y experimentación sobre el motor web.

### Características

- **Juego completo en el navegador** con HTML5, CSS y JavaScript.
- **Carga de niveles** mediante ID o cadena de nivel.
- **Service Worker** (`worker.js`) que intercepta las peticiones del juego para servir niveles y música.
- **Recursos originales** de Geometry Dash (sprites, fuentes, música y efectos) adaptados para la web.
- **Sin instalación**: se ejecuta con cualquier servidor HTTP local.

### Requisitos

- Un navegador moderno con soporte para **Service Workers** (Chrome, Edge, Firefox o Safari recientes).
- Un servidor HTTP local. No abras `index.html` directamente con `file://`, porque el Service Worker y las peticiones de recursos no funcionarán.

### Cómo ejecutarlo

```bash
# Opción 1: Python (incluido en la mayoría de sistemas)
python -m http.server 8080

# Opción 2: Node.js
npx serve .
```

Después abre [http://localhost:8080](http://localhost:8080) en el navegador.

> El juego carga algunos niveles y canciones desde servicios externos alojados en Cloudflare Workers. Si esos servicios dejan de estar disponibles, esas funciones concretas pueden no responder.

### Estructura del proyecto

```text
geometrydashdotcom/
├── index.html        Interfaz y punto de entrada del juego
├── worker.js         Service Worker: niveles, música y comunicación
├── favicon.ico
├── font/             Fuente tipo Pusab usada por la interfaz
└── game/
    ├── assets/       Sprites, fuentes, sonidos y datos de niveles
    └── ...
```

### Aviso legal

Este es un proyecto **no oficial** y **no está afiliado, asociado ni respaldado por RobTop Games**. *Geometry Dash* y todos sus recursos originales son propiedad de sus respectivos autores. El código se comparte con fines educativos y de preservación; si eres titular de algún derecho y deseas que se retire contenido, abre un *Issue* en el repositorio.

Créditos al proyecto original: [lasokar/geometrydashdotcom](https://github.com/lasokar/geometrydashdotcom).

### Licencia

Este repositorio es un fork. Consulta el archivo [LICENSE](LICENSE) para conocer el alcance de la licencia sobre las aportaciones propias y las condiciones del código original.

---

## English

### Table of contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [How to run](#how-to-run)
- [Project structure](#project-structure)
- [Legal notice](#legal-notice)
- [License](#license)

### Overview

An unofficial **web version of Geometry Dash** that lets you play levels directly in the browser. The project is based on the original work by [lasokar/geometrydashdotcom](https://github.com/lasokar/geometrydashdotcom), which adapted the original game assets to HTML5 and JavaScript.

This fork keeps the same playable base and serves as a study copy and experimentation ground for the web engine.

### Features

- **Full game in the browser** using HTML5, CSS and JavaScript.
- **Level loading** by ID or level string.
- **Service Worker** (`worker.js`) that intercepts game requests to serve levels and music.
- **Original Geometry Dash assets** (sprites, fonts, music and sound effects) adapted for the web.
- **No installation**: runs with any local HTTP server.

### Requirements

- A modern browser with **Service Worker** support (recent Chrome, Edge, Firefox or Safari).
- A local HTTP server. Do not open `index.html` directly via `file://`, because the Service Worker and asset requests will not work.

### How to run

```bash
# Option 1: Python (bundled with most systems)
python -m http.server 8080

# Option 2: Node.js
npx serve .
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

> Some levels and songs are loaded from external services hosted on Cloudflare Workers. If those services become unavailable, those specific features may stop working.

### Project structure

```text
geometrydashdotcom/
├── index.html        Game UI and entry point
├── worker.js         Service Worker: levels, music and messaging
├── favicon.ico
├── font/             Pusab-style font used by the UI
└── game/
    ├── assets/       Sprites, fonts, sounds and level data
    └── ...
```

### Legal notice

This is an **unofficial** project and is **not affiliated with, associated with or endorsed by RobTop Games**. *Geometry Dash* and all its original assets are the property of their respective owners. The code is shared for educational and preservation purposes; if you hold rights to any content and want it removed, please open an *Issue* in the repository.

Credits to the original project: [lasokar/geometrydashdotcom](https://github.com/lasokar/geometrydashdotcom).

### License

This repository is a fork. See the [LICENSE](LICENSE) file for the scope of the license covering the author's own contributions and the terms of the original code.
