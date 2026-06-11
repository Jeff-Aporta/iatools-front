(function () {
  "use strict";
  const React = (window as any).React;
  const MUI = (window as any).MaterialUI;

  function useThemeMode() {
    const [mode, setMode] = React.useState<"light" | "dark">("dark");
    React.useEffect(() => {
      try {
        const s = localStorage.getItem("iatools:theme");
        if (s === "light" || s === "dark") setMode(s);
      } catch (e) {}
    }, []);
    const toggle = () => {
      setMode((m) => {
        const n = m === "dark" ? "light" : "dark";
        try { localStorage.setItem("iatools:theme", n); } catch (e) {}
        return n;
      });
    };
    const theme = React.useMemo(
      () => MUI.createTheme({ palette: { mode } }),
      [mode],
    );
    return { mode, toggle, theme };
  }

  function TargetSwitch() {
    const cfg = (window as any).IAT.Config;
    const [local, setLocal] = React.useState(cfg.isLocal());
    React.useEffect(() => {
      const h = () => setLocal(cfg.isLocal());
      window.addEventListener(cfg.EVENT, h);
      return () => window.removeEventListener(cfg.EVENT, h);
    }, []);
    return React.createElement(MUI.FormControlLabel, {
      control: React.createElement(MUI.Switch, {
        size: "small", checked: local,
        onChange: (_e: any, v: boolean) => cfg.setLocal(v),
      }),
      label: "API " + cfg.label(),
    });
  }

  function LoginGate(props: { children: any }) {
    const w = window as any;
    const [ok, setOk] = React.useState(w.IAT.Auth.isLoggedIn());
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [err, setErr] = React.useState("");

    React.useEffect(() => {
      const sync = () => setOk(w.IAT.Auth.isLoggedIn());
      window.addEventListener(w.IAT.Auth.EVENT, sync);
      window.addEventListener("storage", sync);
      return () => { window.removeEventListener(w.IAT.Auth.EVENT, sync); window.removeEventListener("storage", sync); };
    }, []);

    if (ok) return props.children;

    return React.createElement(MUI.Paper, { sx: { p: 4, maxWidth: 420, mx: "auto", mt: 4 } },
      React.createElement(MUI.Typography, { variant: "h6", gutterBottom: true }, "Iniciar sesión"),
      React.createElement(MUI.Typography, { variant: "body2", color: "text.secondary", sx: { mb: 2 } },
        "Auth centralizado vía system-login."),
      err ? React.createElement(MUI.Alert, { severity: "error", sx: { mb: 2 } }, err) : null,
      React.createElement(MUI.TextField, { label: "Usuario", fullWidth: true, size: "small", sx: { mb: 2 }, value: user, onChange: (e: any) => setUser(e.target.value) }),
      React.createElement(MUI.TextField, { label: "Clave", type: "password", fullWidth: true, size: "small", sx: { mb: 2 }, value: pass, onChange: (e: any) => setPass(e.target.value) }),
      React.createElement(MUI.Stack, { direction: "row", spacing: 1 },
        React.createElement(MUI.Button, { variant: "contained", onClick: async () => {
          setErr("");
          try { await w.IAT.Auth.login(user, pass); setOk(true); } catch (e: any) { setErr(e.message); }
        }}, "Entrar"),
        React.createElement(MUI.Button, { href: w.IAT.Auth.LOGIN_URL, target: "_blank", rel: "noreferrer" }, "System Login")));
  }

  const w = window as any;
  w.IAT = w.IAT || {};
  w.IAT.UI = { useThemeMode, TargetSwitch, LoginGate };
})();
