/**
 * Resolves an asset path to work correctly across both local development (/)
 * and GitHub Pages subpath deployment (/ujaas-crisis-care-network/).
 *
 * @param path - The asset path, e.g. '/images/contacts/aarav.png' or 'images/logo-emblem.png'
 * @returns The resolved asset URL with import.meta.env.BASE_URL prefixed appropriately.
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Prevent duplicating base path if already prefixed
  const baseSubpath = cleanBase.replace(/^\//, '');
  if (baseSubpath && cleanPath.startsWith(baseSubpath)) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
}
