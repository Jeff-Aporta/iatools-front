(function () {
  "use strict";
  window.ISAFront.registerApp({
    ns: "IAT",
    api: {
      local: "http://localhost:8784",
      online: "https://iatools.jeffaporta.workers.dev",
      lsKey: "iatools:local",
      event: "iatools:target",
    },
    theme: { lsKey: "iatools:theme" },
    widgets: { targetStyle: "switch" },
    loginGate: "inline",
  });
})();
