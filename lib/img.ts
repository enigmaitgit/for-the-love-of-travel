// lib/img.ts
export function normalizeImageSrc(
  src?: string | { url?: string | null } | null
): string | null {
  const raw = typeof src === 'string' ? src : src?.url ?? '';
  const s = String(raw ?? '').trim();

  // filter trashy values
  if (!s || s === 'undefined' || s === 'null') return null;

  // already a usable URL (http/https, data URLs, or absolute paths)
  if (/^(https?:)?\/\//.test(s) || s.startsWith('/') || s.startsWith('data:')) {
    return s;
  }

  // fallback: treat it as a filename/id from uploads (for backward compatibility)
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  return `${base}/uploads/${encodeURIComponent(s)}`;
}

export function isValidForNextImage(url: string | null): url is string {
  if (!url) return false;
  return (
    /^(https?:)?\/\//.test(url) || url.startsWith('/') || url.startsWith('data:')
  );
}
