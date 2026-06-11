<p align="center">
  <img src="https://api.iconify.design/mdi/robot-outline.svg?color=%23e65100&width=96&height=96" width="96" height="96" alt="IA Tools" />
</p>

<h1 align="center">iatools-front</h1>

<p align="center"><strong>Orquestador IA</strong> — rotación de API keys, slots por capacidad, log de eventos y credenciales LLM.</p>

## Arquitectura

```mermaid
flowchart LR
  IF[iatools-front]
  ORCH[main-orchestrator]
  API[iatools Worker]
  IF -->|/api/orchestrator/*| ORCH --> API
  IF -->|/api/credentials| ORCH --> API
```

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
- Toggle **orquestador local / producción** → `main-orchestrator.jeffaporta.workers.dev`.

## Metadatos

Icono: `mdi:robot-outline` · tema `#e65100` · [`JeffAppMeta`](https://github.com/Jeff-Aporta/front-shared/blob/main/cdn/isa/js/core/app-meta.js).

## Desarrollo local

```bash
npx serve .
# main-orchestrator en :8780
```

## Repos relacionados

| Repo | Rol |
|------|-----|
| [iatools-back](https://github.com/Jeff-Aporta/iatools-back) | API Worker Cloudflare |
| [iatools-front](https://github.com/Jeff-Aporta/iatools-front) | Este panel (GH Pages) |

MIT · [Jeff-Aporta](https://github.com/Jeff-Aporta)
