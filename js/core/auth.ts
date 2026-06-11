(function () {
  "use strict";
  const AUTH_API = "https://system-login.jeffaporta.workers.dev";
  const SESSION_KEY = "system-login:session";

  function session(): { token?: string; username?: string } | null {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  async function login(username: string, password: string): Promise<void> {
    const res = await fetch(AUTH_API + "/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.token) throw new Error(data.error || "Login fallido");
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token, username: data.username || username }));
  }

  function logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function authHeader(): Record<string, string> {
    const s = session();
    return s?.token ? { Authorization: "Bearer " + s.token } : {};
  }

  const w = window as any;
  w.IAT = w.IAT || {};
  w.IAT.Auth = { session, login, logout, authHeader, SESSION_KEY };
})();
