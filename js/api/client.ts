(function () {
  "use strict";
  /** iatools — /api/orchestrator/* y /api/credentials vía gateway. */
  const cfg = () => window.IAT.Config;
  const auth = () => window.IAT.Auth;

  async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(cfg().apiUrl(path), {
      ...init,
      headers: { "Content-Type": "application/json", ...auth().authHeader(), ...(init?.headers || {}) },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.reason || res.statusText);
    return data as T;
  }

  window.IAT = window.IAT || ({} as IatNs);
  window.IAT.Api = {
    status: (cap?: string) => api("/api/orchestrator/status" + (cap ? "?capability=" + cap : "")),
    syncKeys: (cap?: string) => api("/api/orchestrator/sync-keys", { method: "POST", body: JSON.stringify({ capability: cap }) }),
    rotationLog: (limit?: number) => api("/api/orchestrator/rotation-log?limit=" + (limit || 30)),
    models: () => api("/api/orchestrator/models"),
    credentials: () => api("/api/credentials"),
  };
})();
