import React, { useEffect, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { resolveImageUrl } from './resolveImage';

export const AdminMedia = () => {
  const [items, setItems] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migrateResult, setMigrateResult] = useState<{ updated?: number; failures?: number; error?: string } | null>(null);
  const [normalizing, setNormalizing] = useState(false);
  const [normalizeResult, setNormalizeResult] = useState<string>('');
  const [assigning, setAssigning] = useState(false);
  const [assignResult, setAssignResult] = useState<string>('');

  const load = () => api.list('media').then(setItems);
  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    await api.upload(file);
    setFile(null);
    load();
  };

  const remove = async (id: string) => { await api.remove('media', id); load(); };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // noop
    }
  };

  const importAssets = async () => {
    setImporting(true);
    try {
      await fetch(`${API_BASE}/api/media/import-assets`, {
        method: 'POST',
        headers: { ...(localStorage.getItem('admin_token') ? { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } : {}) }
      });
      load();
    } finally {
      setImporting(false);
    }
  };

  const migrateImages = async () => {
    setMigrating(true);
    setMigrateResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/media/migrate`, {
        method: 'POST',
        headers: { ...(localStorage.getItem('admin_token') ? { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } : {}) }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMigrateResult({ error: data?.error || 'Migration failed' });
      } else {
        setMigrateResult({
          updated: data?.updated || 0,
          failures: Array.isArray(data?.failures) ? data.failures.length : 0
        });
      }
      load();
    } finally {
      setMigrating(false);
    }
  };

  const normalizeLocalhost = async () => {
    setNormalizing(true);
    setNormalizeResult('');
    try {
      const res = await fetch(`${API_BASE}/api/media/normalize`, {
        method: 'POST',
        headers: { ...(localStorage.getItem('admin_token') ? { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } : {}) }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNormalizeResult(data?.error || 'Normalize failed');
      } else {
        setNormalizeResult(`Normalized ${data?.updated || 0} records`);
      }
      load();
    } finally {
      setNormalizing(false);
    }
  };

  const autoAssignImages = async () => {
    setAssigning(true);
    setAssignResult('');
    try {
      const res = await fetch(`${API_BASE}/api/media/auto-assign`, {
        method: 'POST',
        headers: { ...(localStorage.getItem('admin_token') ? { Authorization: `Bearer ${localStorage.getItem('admin_token')}` } : {}) }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAssignResult(data?.error || 'Auto-assign failed');
      } else {
        setAssignResult(`Auto-assigned ${data?.updated || 0} items`);
      }
      load();
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Media Library</h1>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={upload} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer border-2 border-dashed border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50/40 transition-colors flex items-center gap-3 min-w-[240px] flex-1">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
              +
            </div>
            <div>
              <div className="font-semibold text-slate-700">Upload image</div>
              <div className="text-xs text-slate-500">Click to choose a file from your PC</div>
            </div>
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          {file && <span className="text-xs text-slate-500 max-w-[200px] truncate">{file.name}</span>}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Upload</button>
          <button type="button" onClick={importAssets} className="bg-slate-900 text-white px-4 py-2 rounded-lg">
            {importing ? 'Importing...' : 'Import Website Assets'}
          </button>
          <button type="button" onClick={migrateImages} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
            {migrating ? 'Migrating...' : 'Migrate Existing Images'}
          </button>
          <button type="button" onClick={normalizeLocalhost} className="bg-amber-500 text-white px-4 py-2 rounded-lg">
            {normalizing ? 'Fixing...' : 'Fix Localhost URLs'}
          </button>
          <button type="button" onClick={autoAssignImages} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            {assigning ? 'Assigning...' : 'Auto-Assign Images'}
          </button>
        </div>
        {file && (
          <div className="mt-4 border border-slate-200 rounded-xl p-2 max-w-xs">
            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
          </div>
        )}
        {migrateResult && (
          <div className="mt-4 text-sm">
            {migrateResult.error ? (
              <span className="text-red-600">{migrateResult.error}</span>
            ) : (
              <span className="text-emerald-700">
                Migrated {migrateResult.updated} images
                {typeof migrateResult.failures === 'number' ? `, ${migrateResult.failures} failed` : ''}.
              </span>
            )}
          </div>
        )}
        {normalizeResult && (
          <div className="mt-2 text-sm text-amber-700">{normalizeResult}</div>
        )}
        {assignResult && (
          <div className="mt-2 text-sm text-indigo-700">{assignResult}</div>
        )}
        </form>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="border border-slate-100 rounded-xl px-3 py-2 bg-white flex items-center gap-3"
            >
              <img
                src={resolveImageUrl(item.url)}
                alt={item.filename}
                className="h-12 w-12 rounded-lg object-cover border border-slate-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 truncate">{item.filename}</p>
                <p className="text-xs text-slate-400 truncate">{item.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => copyUrl(resolveImageUrl(item.url))} className="text-xs text-blue-600">Copy URL</button>
                <button onClick={() => remove(item._id)} className="text-xs text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
