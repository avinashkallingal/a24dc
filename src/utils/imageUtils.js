/**
 * Helper to resolve asset URLs correctly across local dev & subpath hosting (GitHub Pages).
 * Converts absolute root paths like "/hero_arch_bg.png" to relative base URLs.
 */
export const getImageUrl = (url, defaultFallback = './project_arch_1.png') => {
  const targetUrl = url || defaultFallback;
  if (!targetUrl) return '';

  // If it's an external URL or data URI, return as is
  if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://') || targetUrl.startsWith('data:')) {
    return targetUrl;
  }

  // Remove leading slash if present
  const cleanPath = targetUrl.startsWith('/') ? targetUrl.slice(1) : targetUrl;
  const baseUrl = import.meta.env.BASE_URL || './';

  if (baseUrl.endsWith('/')) {
    return `${baseUrl}${cleanPath}`;
  }
  return `${baseUrl}/${cleanPath}`;
};
