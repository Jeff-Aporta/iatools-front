(function () {
  "use strict";
  const MUI = MaterialUI;

  function App() {
    const Shell = window.ISAFront.Layout.AppShell;
    const [cap, setCap] = React.useState("chat");
    const [slots, setSlots] = React.useState([]);
    const [log, setLog] = React.useState([]);
    const [creds, setCreds] = React.useState([]);
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

    const caps = [
      { id: "responses", label: "responses", icon: "mdi:message-reply-text-outline" },
      { id: "speech2text", label: "speech2text", icon: "mdi:microphone-outline" },
      { id: "text2speech", label: "text2speech", icon: "mdi:volume-high" },
      { id: "embeddings", label: "embeddings", icon: "mdi:vector-combine" },
      { id: "rerank", label: "rerank", icon: "mdi:sort-variant" },
      { id: "proofread", label: "proofread", icon: "mdi:spellcheck" },
      { id: "chat", label: "chat", icon: "mdi:chat-outline" },
      { id: "whisper", label: "whisper", icon: "mdi:ear-hearing" },
    ];

    const panel = (
      <MUI.Container maxWidth="lg" sx={{ py: 2 }}>
        {err ? <MUI.Alert severity="error" sx={{ mb: 2 }}>{err}</MUI.Alert> : null}
        <MUI.Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          <MUI.Button variant="outlined" disabled={loading} onClick={async () => { await window.IAT.Api.syncKeys(cap); reload(); }}>
            Sincronizar credenciales
          </MUI.Button>
          <MUI.Button variant="outlined" disabled={loading} onClick={reload}>Recargar</MUI.Button>
        </MUI.Stack>
        <MUI.Grid container spacing={2}>
          <MUI.Grid size={{ xs: 12, md: 7 }}>
            <MUI.Paper variant="outlined" className="isa-glass-card" sx={{ p: 2, maxHeight: 420, overflow: "auto" }}>
              <MUI.Typography variant="subtitle1" gutterBottom>Credenciales en rotación</MUI.Typography>
              <MUI.Table size="small" stickyHeader>
                <MUI.TableHead>
                  <MUI.TableRow>
                    {["Proveedor", "Etiqueta", "Orden", "Listo", "Pausa (ms)", "Fallos"].map((h) => (
                      <MUI.TableCell key={h}>{h}</MUI.TableCell>
                    ))}
                  </MUI.TableRow>
                </MUI.TableHead>
                <MUI.TableBody>
                  {slots.map((s) => (
                    <MUI.TableRow key={String(s.provider) + String(s.keyLabel)}>
                      <MUI.TableCell>{String(s.provider)}</MUI.TableCell>
                      <MUI.TableCell>{String(s.keyLabel)}</MUI.TableCell>
                      <MUI.TableCell>{String(s.sortOrder)}</MUI.TableCell>
                      <MUI.TableCell>{s.ready ? "✓" : "—"}</MUI.TableCell>
                      <MUI.TableCell>{String(s.cooldownMs || 0)}</MUI.TableCell>
                      <MUI.TableCell>{String(s.consecutiveFailures || 0)}</MUI.TableCell>
                    </MUI.TableRow>
                  ))}
                </MUI.TableBody>
              </MUI.Table>
            </MUI.Paper>
          </MUI.Grid>
          <MUI.Grid size={{ xs: 12, md: 5 }}>
            <MUI.Paper variant="outlined" className="isa-glass-card" sx={{ p: 2, mb: 2, maxHeight: 200, overflow: "auto" }}>
              <MUI.Typography variant="subtitle1" gutterBottom>Credenciales</MUI.Typography>
              {creds.map((c) => (
                <MUI.Typography key={String(c.nombre)} variant="body2">
                  {String(c.nombre)} · {String(c.suffix)}
                </MUI.Typography>
              ))}
            </MUI.Paper>
            <MUI.Paper variant="outlined" className="isa-glass-card" sx={{ p: 2, maxHeight: 220, overflow: "auto" }}>
              <MUI.Typography variant="subtitle1" gutterBottom>Rotación reciente</MUI.Typography>
              {log.slice(0, 8).map((r) => (
                <MUI.Typography key={String(r.ILOG)} variant="caption" display="block">
                  {String(r.TS).slice(11, 19)} {String(r.EVENT)} {String(r.PROVIDER)}/{String(r.KEYLABEL)}
                </MUI.Typography>
              ))}
            </MUI.Paper>
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Container>
    );

    return (
      <Shell
        ns="IAT"
        loginGate
        navRows={[{ id: "cap", tier: "primary", value: cap, onChange: setCap, tabs: caps }]}
      >
        {panel}
      </Shell>
    );
  }

  window.IAT = window.IAT || {};
  window.IAT.mount = function () {
    const root = document.getElementById("root");
    if (!root) throw new Error("No se encontró #root");
    ReactDOM.createRoot(root).render(<App />);
  };
  window.IAT.mount();
})();
