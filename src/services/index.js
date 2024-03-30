const randomImport = {
	HighlightRun: () => import("./HighlightRun"),
	// HyperDX: () => import('./HyperDX'), //影响graphql请求
};

let importKey = sessionStorage.getItem("services-idx");
let importKeys = Object.keys(randomImport);
if (!importKey) {
	importKey = importKeys[Math.floor(Math.random() * importKeys.length)];
	sessionStorage.setItem("services-idx", importKey);
} else if (!randomImport[importKey]) {
	importKey = importKeys[0];
}
if (!location.port) {
	randomImport[importKey]();
}
