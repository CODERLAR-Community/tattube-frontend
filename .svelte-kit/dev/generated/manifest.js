const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/category/[slug].svelte"),
	() => import("../../../src/routes/channels.svelte"),
	() => import("../../../src/routes/channel/[slug].svelte"),
	() => import("../../../src/routes/search/[slug].svelte"),
	() => import("../../../src/routes/video/[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/category/[slug].svelte
	[/^\/category\/([^/]+?)\/?$/, [c[0], c[3]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/channels.svelte
	[/^\/channels\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/channel/[slug].svelte
	[/^\/channel\/([^/]+?)\/?$/, [c[0], c[5]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/search/[slug].svelte
	[/^\/search\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/video/[slug].svelte
	[/^\/video\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ slug: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];