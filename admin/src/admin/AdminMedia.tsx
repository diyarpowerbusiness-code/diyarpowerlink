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

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Media Library</h1>
      <form onSubmit={upload} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="cursor-pointer border-2 border-dashed border-slate-200 rounded-xl px-4 py-4 text-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50/40 transition-colors flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
              +
            </div>
            <div>
              <div className="font-semibold text-slate-700">Upload image</div>
              <div className="text-xs text-slate-500">Click to choose a file from your PC</div>
            </div>
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          {file && <span className="text-xs text-slate-500">{file.name}</span>}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Upload</button>
          <button type="button" onClick={importAssets} className="bg-slate-900 text-white px-4 py-2 rounded-lg">
            {importing ? 'Importing...' : 'Import Website Assets'}
          </button>
          <button type="button" onClick={migrateImages} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
            {migrating ? 'Migrating...' : 'Migrate Existing Images'}
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
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="border border-slate-100 rounded-xl p-3 bg-white">
            <img src={resolveImageUrl(item.url)} alt={item.filename} className="w-full h-32 object-cover rounded-lg" />
            <p className="text-xs text-slate-600 mt-2 truncate">{item.filename}</p>
            <div className="flex items-center gap-3 mt-2">
              <button onClick={() => copyUrl(resolveImageUrl(item.url))} className="text-xs text-blue-600">Copy URL</button>
              <button onClick={() => remove(item._id)} className="text-xs text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
