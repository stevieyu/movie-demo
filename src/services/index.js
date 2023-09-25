const randomImport = {
  // HyperDX: () => import('./HyperDX'), //影响graphql请求
  HighlightRun: () => import('./HighlightRun')
}

let randomIndex = sessionStorage.getItem('services-idx')
if(!randomIndex) {
  randomIndex = Math.floor(Math.random() * Object.keys(randomImport).length);
  sessionStorage.setItem('services-idx', randomIndex)
}
if(!location.port) Object.values(randomImport)[randomIndex]();


