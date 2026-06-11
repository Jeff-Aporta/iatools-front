# iatools-front

Panel de **monitoreo y operación del orquestador IA**: estado de slots por capacidad (`chat`, etc.), **rotación de API keys**, log de eventos y catálogo de **credenciales** almacenadas en Neon. Herramienta de laboratorio para repartir cuotas entre proveedores LLM sin tocar código.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=githubpages&logoColor=white)](https://jeff-aporta.github.io/iatools-front/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Babel Standalone](https://img.shields.io/badge/Babel%20Standalone-7-F9DC3E?logo=babel&logoColor=black)](https://babeljs.io/)
[![Cloudflare Workers](https://img.shields.io/badge/API-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://github.com/Jeff-Aporta/iatools-back)
[![Neon](https://img.shields.io/badge/BD-Neon%20BD__IATOOLS-00E599?logo=neon&logoColor=black)](https://neon.tech/)
[![system-login](https://img.shields.io/badge/auth-system--login-007FFF)](https://github.com/Jeff-Aporta/system-login-front)
[![Sin build](https://img.shields.io/badge/build-sin%20paso%20de%20build-555)](https://github.com/Jeff-Aporta/iatools-front)

## Demo

**https://jeff-aporta.github.io/iatools-front/**

## Vista previa

![LoginGate del orquestador IA](./docs/gh-pages.png)

## Qué hace

- **Estado del orquestador**: slots activos, leases y capacidad por tipo de uso.
- **Log de rotación**: historial reciente de cambios de clave.
- **Credenciales**: listado de keys registradas (requiere sesión).
- **LoginGate** integrado con **system-login** (`system-login:session`).
- Toggle **orquestador local / producción** → `localhost:8780` o `main-orchestrator.jeffaporta.workers.dev` (enruta a iatools).

LangLab y otros servicios consumen la misma API vía cliente HTTP en el backend Azure/Workers.

## Desarrollo local

Sirve la carpeta raíz (`npx serve .`) y levanta el **gateway** langlab (`apps/langlab/backend`, `:8780`) en modo local.

## Repos relacionados

| Repo | Rol |
|------|-----|
| [iatools-back](https://github.com/Jeff-Aporta/iatools-back) | API Worker Cloudflare |
| [iatools-front](https://github.com/Jeff-Aporta/iatools-front) | Este panel (GH Pages) |

MIT · [Jeff-Aporta](https://github.com/Jeff-Aporta)
