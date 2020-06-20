
export const constants = {
    DARKMODE_LOCAL_STORAGE_KEY:  'darkModeParams',
    DEFAULTS: {
      darkmode: false,
      brightness: 150,
      contrast: 96,
      sepia: 0,
      grayscale: 0,
    },
    isEdgeChromium:  /^(?=.*\bedg\b).*$/.test( navigator.userAgent.toLowerCase()),
    isEdge: /edge/.test(navigator.userAgent.toLowerCase())
  };
