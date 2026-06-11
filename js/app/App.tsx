(function () {
  "use strict";
  const MUI = MaterialUI;

  function App() {
    const Shell = window.ISAFront.Layout.AppShell;
    const [cap, setCap] = React.useState("chat");
    const [slots, setSlots] = React.useState<unknown[]>([]);
    const [log, setLog] = React.useState<unknown[]>([]);
    const [creds, setCreds] = React.useState<unknown[]>([]);
    const [err, setErr] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const reload = React.useCallback(async () => {
      if (!window.IAT.Auth.isLoggedIn()) return;
      setLoading(true);
      setErr("");
      try {
        const [st, lg, cr] = await Promise.all([
          window.IAT.Api.status(cap),
          window.IAT.Api.rotationLog(20),
          window.IAT.Api.credentials(),
        ]);
        setSlots(st.slots || []);
        setLog(lg.rows || []);
        setCreds(cr.credentials || []);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }, [cap]);

    React.useEffect(() => { reload(); }, [reload]);
    React.useEffect(() => {
      const h = () => reload();
      window.addEventListener(window.IAT.Auth.EVENT, h);
      return () => window.removeEventListener(window.IAT.Auth.EVENT, h);
    }, [reload]);

    const caps = ["responses", "speech2text", "text2speech", "embeddings", "rerank", "proofread", "chat", "whisper"];

    const panel = React.createElement(MUI.Container, { maxWidth: "lg", sx: { py: 2 } },
      err ? React.createElement(MUI.Alert, { severity: "error", sx: { mb: 2 } }, err) : null,
      React.createElement(MUI.Stack, { direction: "row", spacing: 1, sx: { mb: 2, flexWrap: "wrap" } },
        React.createElement(MUI.Tabs, {
          value: cap, onChange: (_e: unknown, v: string) => setCap(v), variant: "scrollable",
        }, caps.map((c) => React.createElement(MUI.Tab, { key: c, value: c, label: c }))),
        React.createElement(MUI.Button, {
          variant: "outlined", disabled: loading,
          onClick: async () => { await window.IAT.Api.syncKeys(cap); reload(); },
        }, "Sincronizar credenciales"),
        React.createElement(MUI.Button, { variant: "outlined", disabled: loading, onClick: reload }, "Recargar")),
      React.createElement(MUI.Grid, { container: true, spacing: 2 },
        React.createElement(MUI.Grid, { size: { xs: 12, md: 7 } },
          React.createElement(MUI.Paper, { sx: { p: 2, maxHeight: 420, overflow: "auto" } },
            React.createElement(MUI.Typography, { variant: "subtitle1", gutterBottom: true }, "Credenciales en rotación"),
            React.createElement(MUI.Table, { size: "small", stickyHeader: true },
              React.createElement(MUI.TableHead, null,
                React.createElement(MUI.TableRow, null,
                  ["Proveedor", "Etiqueta", "Orden", "Listo", "Pausa (ms)", "Fallos"].map((h) =>
                    React.createElement(MUI.TableCell, { key: h }, h)))),
              React.createElement(MUI.TableBody, null,
                slots.map((s) => {
                  const row = s as Record<string, unknown>;
                  return React.createElement(MUI.TableRow, { key: String(row.provider) + String(row.keyLabel) },
                    React.createElement(MUI.TableCell, null, String(row.provider)),
                    React.createElement(MUI.TableCell, null, String(row.keyLabel)),
                    React.createElement(MUI.TableCell, null, String(row.sortOrder)),
                    React.createElement(MUI.TableCell, null, row.ready ? "✓" : "—"),
                    React.createElement(MUI.TableCell, null, String(row.cooldownMs || 0)),
                    React.createElement(MUI.TableCell, null, String(row.consecutiveFailures || 0)));
                }))))),
        React.createElement(MUI.Grid, { size: { xs: 12, md: 5 } },
          React.createElement(MUI.Paper, { sx: { p: 2, mb: 2, maxHeight: 200, overflow: "auto" } },
            React.createElement(MUI.Typography, { variant: "subtitle1", gutterBottom: true }, "Credenciales"),
            creds.map((c) => {
              const cred = c as Record<string, unknown>;
              return React.createElement(MUI.Typography, { key: String(cred.nombre), variant: "body2" },
                String(cred.nombre), " · ", String(cred.suffix));
            })),
          React.createElement(MUI.Paper, { sx: { p: 2, maxHeight: 220, overflow: "auto" } },
            React.createElement(MUI.Typography, { variant: "subtitle1", gutterBottom: true }, "Rotación reciente"),
            log.slice(0, 8).map((r) => {
              const entry = r as Record<string, unknown>;
              return React.createElement(MUI.Typography, { key: String(entry.ILOG), variant: "caption", display: "block" },
                String(entry.TS).slice(11, 19), " ", String(entry.EVENT), " ", String(entry.PROVIDER), "/", String(entry.KEYLABEL));
            })))));

    return React.createElement(Shell, {
      ns: "IAT",
      title: "Herramientas de IA",
      icon: "mdi:robot-outline",
      loginGate: true,
    }, panel);
  }

  window.IAT = window.IAT || ({} as IatNs);
  window.IAT.mount = function () {
    const root = document.getElementById("root");
    if (!root) throw new Error("No se encontró #root");
    ReactDOM.createRoot(root).render(React.createElement(App));
  };
  window.IAT.mount();
})();
