import HyperDX from 'https://s.stevie.top/esm.sh/@hyperdx/browser@0.18.4?bundle';

HyperDX.init({
  apiKey: '93cfce87-090f-4d4e-8607-6b094f1ac824',
  service: 'movie',
  tracePropagationTargets: [/yszy-dgjx.grafbase.app/i], // Set to link traces from frontend to backend requests
  consoleCapture: true, // Capture console logs (default false)
  advancedNetworkCapture: true, // Capture full HTTP request/response headers and bodies (default false)
});


