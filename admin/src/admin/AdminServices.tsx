import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { api } from './api';

const empty = { title: '', description: '', icon: '', featured: false };
const iconPool = [
  'Lightbulb',
  'Wrench',
  'Network',
  'Headphones',
  'ShieldCheck',
  'Truck',
  'Server',
  'Settings'
];

export const AdminServices = ({ embedded = false }: { embedded?: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const load = () => api.list('services').then(setItems);
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveState('saving');
    try {
      const resolvedIcon = form.icon && form.icon.trim()
        ? form.icon.trim()
        : iconPool[items.length % iconPool.length];
      const payload = { ...form, icon: resolvedIcon };
      if (editingId) await api.update('services', editingId, payload);
      else await api.create('services', payload);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const edit = (item: any) => { setEditingId(item._id); setForm(item); };
  const remove = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    setSaveState('saving');
    try {
      await api.remove('services', id);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
    load();
  };

  return (
    <div>
      {!embedded && <h1 className="text-2xl font-bold text-slate-900 mb-6">Services</h1>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Service' : 'Add Service'}</h2>
          <p className="text-xs text-slate-500">Homepage shows 4 services. Keep only four active cards.</p>
          <textarea rows={2} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <input placeholder="Icon (e.g., Network)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured on Homepage
          </label>
          <div className="flex items-center gap-3">
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold">
              {saveState === 'saving' ? 'Saving...' : 'Save'}
            </button>
            {saveState === 'saved' && <span className="text-xs text-emerald-600">Saved</span>}
            {saveState === 'error' && <span className="text-xs text-red-600">Save failed</span>}
          </div>
        </form>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Current Services</h3>
            <span className="text-xs text-slate-500">{items.length} items</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item._id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  {(() => {
                    const Icon = (Icons as any)[item.icon] || Icons.HelpCircle;
                    return <Icon size={22} />;
                  })()}
                </div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                {item.featured && <p className="text-xs font-semibold text-blue-600 mb-2">Featured</p>}
                <div className="flex gap-2">
                  <button onClick={() => edit(item)} className="text-sm text-blue-600">Edit</button>
                  <button onClick={() => remove(item._id)} className="text-sm text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
