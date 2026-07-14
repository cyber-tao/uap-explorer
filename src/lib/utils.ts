/**
 * Resolve a bundled/public asset path against Vite's configured `base`.
 *
 * The app is built with `base: './'` (relative deployment for sub-paths and
 * file://), but data files reference images with a root-absolute `/images/...`
 * path. Those absolute paths break once the site is served from anywhere other
 * than the domain root. Routing this through `import.meta.env.BASE_URL` keeps
 * local assets working in dev, in sub-path deployments and from file://.
 *
 * External URLs (http/https/protocol-relative) and data URIs are returned as-is.
 */
export function assetUrl(p: string | undefined | null): string {
  if (!p) return ""
  if (/^(https?:)?\/\//.test(p) || p.startsWith("data:")) return p
  const base = import.meta.env.BASE_URL || "/"
  return base.replace(/\/$/, "") + "/" + p.replace(/^\/+/, "")
}
