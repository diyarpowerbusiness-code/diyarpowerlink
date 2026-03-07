import { API_BASE } from '../api';

const base = API_BASE || '';

const authHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  },
  summary: () => fetch(`${base}/api/dashboard/summary`, { headers: authHeaders() }).then(r => r.json()),
  list: (resource: string) => fetch(`${base}/api/${resource}`, { headers: authHeaders() }).then(r => r.json()),
  create: (resource: string, data: any) => fetch(`${base}/api/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  update: (resource: string, id: string, data: any) => fetch(`${base}/api/${resource}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  remove: (resource: string, id: string) => fetch(`${base}/api/${resource}/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  }).then(r => r.json()),
  patch: (resource: string, id: string, data: any) => fetch(`${base}/api/${resource}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  upload: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return fetch(`${base}/api/media`, {
      method: 'POST',
      headers: { ...authHeaders() },
      body: form
    }).then(r => r.json());
  },
  seedDefaults: () => fetch(`${base}/api/admin/seed-defaults`, {
    method: 'POST',
    headers: authHeaders()
  }).then(r => r.json())
};
