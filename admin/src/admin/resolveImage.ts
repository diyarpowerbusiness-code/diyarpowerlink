import { API_BASE, PUBLIC_SITE_URL } from '../api';

const ABSOLUTE_RE = /^https?:\/\//i;
const FILE_EXT_RE = /\.(png|jpe?g|webp|gif|svg)$/i;
const PARTNER_HINTS = ['microsoft', 'adobe', 'autodesk', 'kaspersky', 'eset', 'norton', 'diyar', 'logo'];

export const resolveImageUrl = (src?: string) => {
  if (!src) return '';
  if (ABSOLUTE_RE.test(src) || src.startsWith('data:')) return src;
  if (!src.startsWith('/') && src.startsWith('assets/')) return `/${src}`;
  if (!src.startsWith('/') && src.startsWith('uploads/')) return `${API_BASE}/${src}`;
  if (src.startsWith('/uploads')) return `${API_BASE}${src}`;
  if (src.startsWith('/assets')) {
    const base = PUBLIC_SITE_URL || API_BASE;
    return base ? `${base}${encodeURI(src)}` : encodeURI(src);
  }
  if (!src.startsWith('/') && FILE_EXT_RE.test(src)) {
    const name = src.toLowerCase();
    const isPartner = PARTNER_HINTS.some((hint) => name.includes(hint));
    const folder = isPartner ? '/assets/partners/' : '/assets/docx/';
    const base = PUBLIC_SITE_URL || '';
    const path = `${folder}${encodeURIComponent(src)}`;
    return base ? `${base}${path}` : path;
  }
  return src;
};
