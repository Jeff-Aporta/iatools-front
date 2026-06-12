<p align="center">
  <img src="https://api.iconify.design/mdi/robot-outline.svg?color=%23e65100&width=96&height=96" width="96" height="96" alt="IA Tools" />
</p>

<h1 align="center">iatools-front</h1>

<p align="center"><strong>Herramientas de IA</strong> — chat, voz, claves y registro de uso.</p>

## Arquitectura
![Diagrama de arquitectura](https://mermaid.ink/img/JSV7aW5pdDogeyJmbG93Y2hhcnQiOiB7ImN1cnZlIjogInN0ZXBBZnRlciIsICJodG1sTGFiZWxzIjogdHJ1ZSwgIm5vZGVTcGFjaW5nIjogNDQsICJyYW5rU3BhY2luZyI6IDUyLCAicGFkZGluZyI6IDE4fX19JSUKZmxvd2NoYXJ0IExSCiAgSUZbaWF0b29scy1mcm9udF0KICBPUkNIW21haW4tb3JjaGVzdHJhdG9yXQogIEFQSVtpYXRvb2xzIFdvcmtlcl0KICBJRiAtLT58L2FwaS9vcmNoZXN0cmF0b3IvKnwgT1JDSCAtLT4gQVBJCiAgSUYgLS0-fC9hcGkvY3JlZGVudGlhbHN8IE9SQ0ggLS0-IEFQSQ==)

> **Fuente del diagrama:** [`docs/arquitectura.mmd`](docs/arquitectura.mmd) — editar el `.mmd`; regenerar imagen: `node scripts/mermaid-ink-url.mjs iatools/frontend/docs/arquitectura.mmd` (desde `apps/`).

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=githubpages&logoColor=white)](https://jeff-aporta.github.io/iatools-front/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Cloudflare Workers](https://img.shields.io/badge/API-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://github.com/Jeff-Aporta/iatools-back)
[![Neon](https://img.shields.io/badge/BD-Neon%20BD__IATOOLS-00E599?logo=neon&logoColor=black)](https://neon.tech/)

## Demo

**https://jeff-aporta.github.io/iatools-front/**

## Vista previa

![LoginGate del orquestador IA](./docs/gh-pages.png)

## Qué hace

- **Estado del orquestador**: slots activos, leases y capacidad por tipo de uso.
- **Log de rotación**: historial reciente de cambios de clave.
- **Credenciales**: listado de keys registradas (requiere sesión).
- **LoginGate** integrado con **system-login**.
- Toggle **local / producción** con TargetSwitch (gateway en `front-shared`).

## Metadatos

Icono: `mdi:robot-outline` · tema `#e65100` · [`JeffAppMeta`](https://github.com/Jeff-Aporta/front-shared/blob/main/cdn/isa/js/core/app-meta.js).

## Desarrollo local

```bash
npx serve .
# TargetSwitch → modo local si desarrollas backends en wrangler dev
```

## Repos relacionados

| Repo | Rol |
|------|-----|
| [iatools-back](https://github.com/Jeff-Aporta/iatools-back) | API Worker Cloudflare |
| [iatools-front](https://github.com/Jeff-Aporta/iatools-front) | Este panel (GH Pages) |

MIT · [Jeff-Aporta](https://github.com/Jeff-Aporta)
