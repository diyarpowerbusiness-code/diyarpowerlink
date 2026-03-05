export const API_BASE = import.meta.env.VITE_API_URL || '';

export const pingApi = async () => {
  if (!API_BASE) return;
  try {
    await fetch(API_BASE, { method: 'GET' });
  } catch {
    // Silent fail: backend may be sleeping or not configured in env
  }
};
