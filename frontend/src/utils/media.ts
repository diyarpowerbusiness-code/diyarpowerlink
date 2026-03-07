import { API_BASE } from '../api';

const ABSOLUTE_RE = /^https?:\/\//i;
const FILE_EXT_RE = /\.(png|jpe?g|webp|gif|svg)$/i;
const PARTNER_HINTS = ['microsoft', 'adobe', 'autodesk', 'kaspersky', 'eset', 'norton', 'diyar', 'logo'];

export const resolveImageUrl = (src?: string) => {
  if (!src) return '';
  if (ABSOLUTE_RE.test(src) || src.startsWith('data:')) return src;
  if (!src.startsWith('/') && src.startsWith('assets/')) return `/${src}`;
  if (!src.startsWith('/') && src.startsWith('uploads/')) return `${API_BASE}/${src}`;
  if (src.startsWith('/uploads')) return `${API_BASE}${src}`;
  if (src.startsWith('/assets')) return encodeURI(src);
  if (!src.startsWith('/') && FILE_EXT_RE.test(src)) {
    const name = src.toLowerCase();
    const isPartner = PARTNER_HINTS.some((hint) => name.includes(hint));
    const folder = isPartner ? '/assets/partners/' : '/assets/docx/';
    return `${folder}${encodeURIComponent(src)}`;
  }
  return src;
};

export const getCategoryFallbackImage = (category?: string) => {
  const value = (category || '').toLowerCase();
  if (!value) return '/assets/docx/it solution.png';
  if (value.includes('paper') || value.includes('thermal')) return '/assets/docx/paper products.png';
  if (value.includes('medical')) return '/assets/docx/medical.png';
  if (value.includes('packaging')) return '/assets/docx/image29.jpeg';
  return '/assets/docx/it solution.png';
};
