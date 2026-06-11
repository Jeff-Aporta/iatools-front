(function () {
  "use strict";
  const React = (window as any).React;
  const MUI = (window as any).MaterialUI;
  const w = window as any;

  function App() {
    const tm = w.IAT.UI.useThemeMode();
    const [cap, setCap] = React.useState("chat");
    const [slots, setSlots] = React.useState<any[]>([]);
    const [log, setLog] = React.useState<any[]>([]);
    const [creds, setCreds] = React.useState<any[]>([]);
    const [err, setErr] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const reload = React.useCallback(async () => {
      if (!w.IAT.Auth.isLoggedIn()) return;
      setLoading(true);
      setErr("");
      try {
        const [st, lg, cr] = await Promise.all([
          w.IAT.Api.status(cap),
          w.IAT.Api.rotationLog(20),
          w.IAT.Api.credentials(),
        ]);
        setSlots(st.slots || []);
        setLog(lg.rows || []);
        setCreds(cr.credentials || []);
      } catch (e: any) {
        setErr(e.message || String(e));
      } finally {
        setLoading(false);
      }
    }, [cap]);

    React.useEffect(() => { reload(); }, [reload]);
    React.useEffect(() => {
      const h = () => reload();
      window.addEventListener(w.IAT.Auth.EVENT, h);
      return () => window.removeEventListener(w.IAT.Auth.EVENT, h);
    }, [reload]);

    const caps = ["chat", "proofread", "whisper", "embeddings", "rerank"];

    return React.createElement(MUI.ThemeProvider, { theme: tm.theme },
      React.createElement(MUI.CssBaseline, null),
      React.createElement(MUI.Box, { sx: { height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" } },
        React.createElement(MUI.AppBar, { position: "static", color: "default", elevation: 0, sx: { borderBottom: 1, borderColor: "divider", flexShrink: 0 } },
          React.createElement(MUI.Toolbar, { sx: { gap: 1, flexWrap: "wrap" } },
            React.createElement(MUI.Typography, { variant: "h6", sx: { mr: 1 } }, "IA Tools · Orquestador"),
            React.createElement(MUI.Box, { sx: { flexGrow: 1 } }),
            w.IAT.Auth.isLoggedIn() && React.createElement(MUI.Chip, { size: "small", label: w.IAT.Auth.username() }),
            React.createElement(w.IAT.UI.TargetSwitch, null),
            w.IAT.Auth.isLoggedIn() && React.createElement(MUI.Button, { size: "small", onClick: () => w.IAT.Auth.logout() }, "Salir"))),
        React.createElement(MUI.Box, { sx: { flex: 1, minHeight: 0, overflow: "auto" } },
          React.createElement(w.IAT.UI.LoginGate, null,
          React.createElement(MUI.Container, { maxWidth: "lg", sx: { py: 2 } },
            err ? React.createElement(MUI.Alert, { severity: "error", sx: { mb: 2 } }, err) : null,
            React.createElement(MUI.Stack, { direction: "row", spacing: 1, sx: { mb: 2, flexWrap: "wrap" } },
              React.createElement(MUI.Tabs, {
                value: cap, onChange: (_e: any, v: string) => setCap(v), variant: "scrollable",
              }, caps.map((c) => React.createElement(MUI.Tab, { key: c, value: c, label: c }))),
              React.createElement(MUI.Button, {
                variant: "outlined", disabled: loading,
                onClick: async () => { await w.IAT.Api.syncKeys(cap); reload(); },
              }, "Sync keys"),
              React.createElement(MUI.Button, { variant: "outlined", disabled: loading, onClick: reload }, "Recargar")),
            React.createElement(MUI.Grid, { container: true, spacing: 2 },
              React.createElement(MUI.Grid, { item: true, xs: 12, md: 7 },
                React.createElement(MUI.Paper, { sx: { p: 2, maxHeight: 420, overflow: "auto" } },
                  React.createElement(MUI.Typography, { variant: "subtitle1", gutterBottom: true }, "Slots"),
                  React.createElement(MUI.Table, { size: "small", stickyHeader: true },
                    React.createElement(MUI.TableHead, null,
                      React.createElement(MUI.TableRow, null,
                        ["Provider", "Key", "Orden", "Listo", "Cooldown ms", "Fallos"].map((h) =>
                          React.createElement(MUI.TableCell, { key: h }, h)))),
                    React.createElement(MUI.TableBody, null,
                      slots.map((s: any) =>
                        React.createElement(MUI.TableRow, { key: s.provider + s.keyLabel },
                          React.createElement(MUI.TableCell, null, s.provider),
                          React.createElement(MUI.TableCell, null, s.keyLabel),
                          React.createElement(MUI.TableCell, null, s.sortOrder),
                          React.createElement(MUI.TableCell, null, s.ready ? "✓" : "—"),
                          React.createElement(MUI.TableCell, null, s.cooldownMs || 0),
                          React.createElement(MUI.TableCell, null, s.consecutiveFailures || 0))))))),
              React.createElement(MUI.Grid, { item: true, xs: 12, md: 5 },
                React.createElement(MUI.Paper, { sx: { p: 2, mb: 2, maxHeight: 200, overflow: "auto" } },
                  React.createElement(MUI.Typography, { variant: "subtitle1", gutterBottom: true }, "Credenciales"),
                  creds.map((c: any) =>
                    React.createElement(MUI.Typography, { key: c.nombre, variant: "body2" },
                      c.nombre, " · ", c.suffix))),
                React.createElement(MUI.Paper, { sx: { p: 2, maxHeight: 220, overflow: "auto" } },
                  React.createElement(MUI.Typography, { variant: "subtitle1", gutterBottom: true }, "Rotación reciente"),
                  log.slice(0, 8).map((r: any) =>
                    React.createElement(MUI.Typography, { key: r.ILOG, variant: "caption", display: "block" },
                      String(r.TS).slice(11, 19), " ", r.EVENT, " ", r.PROVIDER, "/", r.KEYLABEL))))))))));
  }

  w.IAT = w.IAT || {};
  w.IAT.mount = function () {
    (window as any).ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
  };
  w.IAT.mount();
})();
