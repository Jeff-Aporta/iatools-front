(function () {
  "use strict";
  const LOCAL = "http://localhost:8787";
  const ONLINE = "https://iatools.jeffaporta.workers.dev";
  const LS = "iatools:local";
  const EVT = "iatools:target";

  function isLocal(): boolean {
    try { return localStorage.getItem(LS) === "1"; } catch (e) { return false; }
  }
  function setLocal(on: boolean): void {
    try { localStorage.setItem(LS, on ? "1" : "0"); } catch (e) {}
    window.dispatchEvent(new Event(EVT));
  }
  function base(): string { return (isLocal() ? LOCAL : ONLINE).replace(/\/$/, ""); }
  function apiUrl(path: string): string { return base() + (path.charAt(0) === "/" ? path : "/" + path); }
  function label(): string { return isLocal() ? "local :8787" : "online"; }

  const w = window as any;
  w.IAT = w.IAT || {};
  w.IAT.Config = { isLocal, setLocal, base, apiUrl, label, EVENT: EVT, ONLINE, LOCAL };
})();
