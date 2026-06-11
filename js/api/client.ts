(function () {
  "use strict";
  const w = window as any;
  const cfg = () => w.IAT.Config;
  const auth = () => w.IAT.Auth;

  async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(cfg().apiUrl(path), {
      ...init,
      headers: { "Content-Type": "application/json", ...auth().authHeader(), ...(init?.headers || {}) },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.reason || res.statusText);
    return data as T;
  }

  w.IAT = w.IAT || {};
  w.IAT.Api = {
    status: (cap?: string) => api("/orchestrator/status" + (cap ? "?capability=" + cap : "")),
    syncKeys: (cap?: string) => api("/orchestrator/sync-keys", { method: "POST", body: JSON.stringify({ capability: cap }) }),
    rotationLog: (limit?: number) => api("/orchestrator/rotation-log?limit=" + (limit || 30)),
    models: () => api("/orchestrator/models"),
    credentials: () => api("/api/credentials"),
  };
})();
