import { API_BASE, PUBLIC_SITE_URL } from '../api';

const ABSOLUTE_RE = /^https?:\/\//i;
const FILE_EXT_RE = /\.(png|jpe?g|webp|gif|svg)$/i;

export const resolveImageUrl = (src?: string) => {
  if (!src) return '';
  if (ABSOLUTE_RE.test(src) || src.startsWith('data:')) return src;
  if (!src.startsWith('/') && src.startsWith('assets/')) return `/${src}`;
  if (!src.startsWith('/') && src.startsWith('uploads/')) return `${API_BASE}/${src}`;
  if (src.startsWith('/uploads')) return `${API_BASE}${src}`;
  if (src.startsWith('/assets')) {
    const base = PUBLIC_SITE_URL || API_BASE;
    return base ? `${base}${src}` : src;
  }
  if (!src.startsWith('/') && FILE_EXT_RE.test(src)) {
    return `/assets/docx/${src}`;
  }
  return src;
};
