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

  const w = window as any;
  w.IAT = w.IAT || {};
  w.IAT.UI = { useThemeMode, TargetSwitch };
})();
