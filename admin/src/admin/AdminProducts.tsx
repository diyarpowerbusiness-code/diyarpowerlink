import React, { useEffect, useState } from 'react';
import { api } from './api';
import { UploadField } from './UploadField';
import { resolveImageUrl } from './resolveImage';

const empty = { name: '', category: '', description: '', features: '', images: '', status: 'active', price: '', sku: '' };

export const AdminProducts = () => {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState('IT Solutions');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [uploadingImage, setUploadingImage] = useState(false);

  const load = () => api.list('products').then(setItems);
  const loadCategories = () => api.list('categories').then(setCategories);

  useEffect(() => { load(); loadCategories(); }, []);
  useEffect(() => {
    if (categories && categories.length > 0 && !categories.find((c: any) => c.name === activeGroup)) {
      setActiveGroup(categories[0].name);
    }
  }, [categories]);


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const splitList = (value: string) =>
      value
        .split(/[,\\n]/)
        .map((s: string) => s.trim())
        .filter(Boolean);
    const normalizeImages = (value: string) => {
      const trimmed = (value || '').trim();
      if (!trimmed) return [];
      // If a direct URL/path is provided, keep it as a single image
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
        return [trimmed];
      }
      return splitList(trimmed);
    };
    const payload = {
      ...form,
      features: splitList(form.features || ''),
      images: normalizeImages(form.images || ''),
      price: form.price === '' ? 0 : Number(form.price)
    };
    setSaveState('saving');
    try {
      if (editingId) await api.update('products', editingId, payload);
      else await api.create('products', payload);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const edit = (p: any) => {
    setEditingId(p._id);
    const imagesVal = Array.isArray(p.images) ? (p.images[0] || '') : (p.images || '');
    setForm({
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price ?? '',
      sku: p.sku ?? '',
      features: (p.features || []).join(', '),
      images: imagesVal,
      status: p.status || 'active'
    });
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    setSaveState('saving');
    try {
      await api.remove('products', id);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
    load();
  };

  const categoryGroups = (categories && categories.length > 0)
    ? categories.map((c: any) => ({ name: c.name, categories: [c.name] }))
    : [
      { name: 'IT Solutions', categories: ['IT Solutions'] },
      { name: 'Paper Products', categories: ['Paper Products'] },
      { name: 'Medical Supplies', categories: ['Medical Supplies'] },
      { name: 'Packaging Materials', categories: ['Packaging Materials'] }
    ];


  const getGroupItems = (group: { categories: string[] }) =>
    items.filter((p) => group.categories.includes(p.category));

  const categoryOptions = Array.from(new Set([
    ...((categories || []).map((c: any) => c.name)),
    ...(form.category ? [form.category] : [])
  ]));

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categoryGroups.map((group) => (
          <button
            key={group.name}
            type="button"
            onClick={() => setActiveGroup(group.name)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeGroup === group.name ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {group.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => { load(); loadCategories(); }}
          className="px-3 py-2 rounded-full text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Product' : 'Add Product'}</h2>
          <input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          {categoryOptions.length > 0 ? (
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required>
            <option value="">Select Category</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ) : (
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
        )}
          <textarea placeholder="Short Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="SKU / Product Code" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <input type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          </div>
          <textarea rows={3} placeholder="Key Features (comma or new line separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          <UploadField label="Product Image" value={form.images} onChange={(val) => setForm({ ...form, images: val })} onUploadingChange={setUploadingImage} />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="flex items-center gap-3">
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold" disabled={uploadingImage}>
              {saveState === 'saving' ? 'Saving...' : 'Save'}
            </button>
            {saveState === 'saved' && <span className="text-xs text-emerald-600">Saved</span>}
            {saveState === 'error' && <span className="text-xs text-red-600">Save failed</span>}
          </div>
        </form>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {categoryGroups.filter((g) => g.name === activeGroup).map((group) => {
            const groupItems = getGroupItems(group);
            return (
              <div key={group.name}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
                  <span className="text-xs text-slate-500">{groupItems.length} items</span>
                </div>
                {groupItems.length === 0 ? (
                  <p className="text-sm text-slate-500">No products in this category yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupItems.map((p) => (
                      <div key={p._id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                        <div className="aspect-[16/9] bg-white border border-slate-100 rounded-xl overflow-hidden mb-3">
                          {(() => {
                            const img = (p.image || (Array.isArray(p.images) ? p.images[0] : p.images)) as string | undefined;
                            return img ? (
                            <img src={resolveImageUrl(img)} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No image</div>
                            );
                          })()}
                        </div>
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500 mb-2">{p.category}</p>
                        <p className="text-xs text-slate-500 mb-1">SKU: {p.sku || '-'}</p>
                        <p className="text-xs text-slate-500 mb-3">Price: {p.price !== undefined ? `₹${p.price}` : '-'}</p>
                        <p className="text-sm text-slate-600 mb-3">{p.description}</p>
                        <div className="flex gap-2">
                          <button onClick={() => edit(p)} className="text-sm text-blue-600">Edit</button>
                          <button onClick={() => remove(p._id)} className="text-sm text-red-600">Delete</button>
                          <button
                            onClick={() => {
                              const base = (import.meta as any).env?.VITE_PUBLIC_SITE_URL || window.location.origin;
                              window.open(`${base}/pos-label?productId=${p._id}`, '_blank');
                            }}
                            className="text-sm text-slate-700"
                          >
                            View POS Label
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
