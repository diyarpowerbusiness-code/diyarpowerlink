import React, { useEffect, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { UploadField } from './UploadField';
import { AdminUsers } from './AdminUsers';

export const AdminSettings = () => {
  const [form, setForm] = useState<any>({
    websiteName: 'Diyar Power Link LLP',
    logo: '',
    footerText: 'Diyar Power Link LLP and Diyar Computers: Your One Shop for All IT Needs. Providing high-quality IT hardware, specialized paper products, medical supplies, and industrial packaging solutions across India.',
    footerDivisions: [
      'IT Solutions & Infrastructure',
      'Paper Products & Thermal Rolls',
      'Medical Supplies & Wristbands',
      'Packaging Materials & Tools',
      'Technical Services & Support'
    ],
    socialLinks: { facebook: '', instagram: '', linkedin: '', twitter: '' },
    contactRecipient: ''
  });
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [section, setSection] = useState<'Brand' | 'Social' | 'Contact' | 'Admin Users'>('Brand');

  useEffect(() => {
    api.list('settings')
      .then((data) => {
        if (data && data._id) {
          setForm((prev: any) => ({
            ...prev,
            ...data,
            socialLinks: { ...prev.socialLinks, ...(data.socialLinks || {}) }
          }));
        }
      })
      .catch(() => null);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveState('saving');
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('admin_token')
            ? { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
            : {})
        },
        body: JSON.stringify({
          websiteName: form.websiteName,
          logo: form.logo,
          footerText: form.footerText,
          footerDivisions: form.footerDivisions,
          socialLinks: form.socialLinks,
          contactRecipient: form.contactRecipient
        })
      });
      setSaveState(res.ok ? 'saved' : 'error');
    } catch {
      setSaveState('error');
    }
  };

  const clearSettings = () => {
    setForm({
      ...form,
      websiteName: '',
      logo: '',
      socialLinks: { facebook: '', instagram: '', linkedin: '', twitter: '' },
      contactRecipient: ''
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {(['Brand', 'Social', 'Contact', 'Admin Users'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSection(item)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${section === item ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {item}
          </button>
        ))}
      </div>
      {section === 'Admin Users' ? (
        <AdminUsers />
      ) : (
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          {section === 'Brand' && (
            <>
              <h2 className="text-lg font-semibold text-slate-800">Brand</h2>
              <input placeholder="Website Name" value={form.websiteName || ''} onChange={(e) => setForm({ ...form, websiteName: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
              <UploadField label="Logo" value={form.logo || ''} onChange={(val) => setForm({ ...form, logo: val })} />
            </>
          )}
          {section === 'Social' && (
            <>
              <h2 className="text-lg font-semibold text-slate-800">Social Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input placeholder="Facebook" value={form.socialLinks?.facebook || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, facebook: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
                <input placeholder="Instagram" value={form.socialLinks?.instagram || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, instagram: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
                <input placeholder="LinkedIn" value={form.socialLinks?.linkedin || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
                <input placeholder="Twitter" value={form.socialLinks?.twitter || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
              </div>
            </>
          )}
          {section === 'Contact' && (
            <>
              <h2 className="text-lg font-semibold text-slate-800">Contact Emails</h2>
              <p className="text-sm text-slate-500">Contact form submissions will be sent to this email.</p>
              <input
                placeholder="Recipient Email"
                value={form.contactRecipient || ''}
                onChange={(e) => setForm({ ...form, contactRecipient: e.target.value })}
                className="border border-slate-200 rounded-xl px-3 py-2"
              />
            </>
          )}
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold">
              {saveState === 'saving' ? 'Saving...' : 'Save Settings'}
            </button>
            <button type="button" onClick={clearSettings} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm">
              Clear Section
            </button>
            {saveState === 'saved' && <span className="text-sm text-emerald-600">Saved</span>}
            {saveState === 'error' && <span className="text-sm text-red-600">Save failed</span>}
          </div>
        </form>
      )}
    </div>
  );
};
