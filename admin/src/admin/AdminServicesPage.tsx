import React, { useEffect, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { useSearchParams } from 'react-router-dom';
import { AdminServices } from './AdminServices';
import { PairsEditor } from './PairsEditor';
import { StepsEditor } from './StepsEditor';
import { ListEditor } from './ListEditor';

export const AdminServicesPage = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<any>({
    servicesPage: {
      heroTitle: 'Our Services',
      heroSubtitle: 'Unlocking the Power of Our Services. We provide comprehensive IT solutions tailored to your business needs, from hardware supply to technical support.',
      introTitle: 'What We Offer',
      introSubtitle: 'A comprehensive suite of services designed to keep your business running at peak performance.',
      detailTitle: 'IT & Technical Expertise',
      detailSubtitle: 'Diyar Computers provides end-to-end IT solutions to ensure your business infrastructure is robust, efficient, and future-ready.',
      detailDescription: 'Our team\'s expertise spans across various domains of information technology. We don\'t just supply products; we provide comprehensive services including hardware supply, installation, network infrastructure (LAN/Fiber), and ongoing maintenance.',
      detailItems: [],
      processTitle: 'Our Service Process',
      processSubtitle: 'How we deliver excellence from initial consultation to ongoing support.',
      processSteps: [],
      enterpriseTitle: 'Enterprise IT Solutions',
      enterpriseDescription: 'Our team is dedicated to resolving any reported hardware and software issues quickly and efficiently, minimizing downtime for your business.',
      enterpriseItems: []
    }
  });
  const [section, setSection] = useState('Services List');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setSection(tab);
  }, [searchParams]);

  useEffect(() => {
    api.list('settings')
      .then((data) => {
        if (data && data._id) {
          setForm((prev: any) => ({
            ...prev,
            servicesPage: { ...prev.servicesPage, ...(data.servicesPage || {}) }
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
        body: JSON.stringify({ servicesPage: form.servicesPage })
      });
      setSaveState(res.ok ? 'saved' : 'error');
    } catch {
      setSaveState('error');
    }
  };

  const clearSection = () => {
    if (section !== 'Service Details') return;
    setForm({
      ...form,
      servicesPage: {
        ...form.servicesPage,
        heroTitle: '',
        heroSubtitle: '',
        introTitle: '',
        introSubtitle: '',
        detailTitle: '',
        detailSubtitle: '',
        detailDescription: '',
        detailItems: [],
        processTitle: '',
        processSubtitle: '',
        processSteps: [],
        enterpriseTitle: '',
        enterpriseDescription: '',
        enterpriseItems: []
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Services Page</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {['Services List', 'Service Details'].map((item) => (
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

      {section === 'Services List' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <AdminServices />
        </div>
      ) : (
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          {section === 'Service Details' && (
            <>
            <h2 className="text-lg font-semibold text-slate-800">Hero</h2>
            <textarea rows={2} placeholder="Hero Title" value={form.servicesPage?.heroTitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, heroTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Hero Subtitle" value={form.servicesPage?.heroSubtitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, heroSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />

            <h2 className="text-lg font-semibold text-slate-800 pt-4 border-t border-slate-200">Intro</h2>
            <textarea rows={2} placeholder="Intro Title" value={form.servicesPage?.introTitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, introTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Intro Subtitle" value={form.servicesPage?.introSubtitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, introSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />

            <h2 className="text-lg font-semibold text-slate-800 pt-4 border-t border-slate-200">Details</h2>
            <textarea rows={2} placeholder="Detail Title" value={form.servicesPage?.detailTitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, detailTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Detail Subtitle" value={form.servicesPage?.detailSubtitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, detailSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Detail Description" value={form.servicesPage?.detailDescription || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, detailDescription: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <PairsEditor
              label="Detail Items"
              items={form.servicesPage?.detailItems || []}
              onChange={(items) => setForm({ ...form, servicesPage: { ...form.servicesPage, detailItems: items } })}
              addLabel="Add Detail Item"
            />

            <h2 className="text-lg font-semibold text-slate-800 pt-4 border-t border-slate-200">Process</h2>
            <textarea rows={2} placeholder="Process Title" value={form.servicesPage?.processTitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, processTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Process Subtitle" value={form.servicesPage?.processSubtitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, processSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <StepsEditor
              label="Process Steps"
              items={form.servicesPage?.processSteps || []}
              onChange={(items) => setForm({ ...form, servicesPage: { ...form.servicesPage, processSteps: items } })}
              addLabel="Add Step"
            />

            <h2 className="text-lg font-semibold text-slate-800 pt-4 border-t border-slate-200">Enterprise Card</h2>
            <textarea rows={2} placeholder="Enterprise Title" value={form.servicesPage?.enterpriseTitle || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, enterpriseTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Enterprise Description" value={form.servicesPage?.enterpriseDescription || ''} onChange={(e) => setForm({ ...form, servicesPage: { ...form.servicesPage, enterpriseDescription: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <ListEditor
              label="Enterprise Items"
              items={form.servicesPage?.enterpriseItems || []}
              onChange={(items) => setForm({ ...form, servicesPage: { ...form.servicesPage, enterpriseItems: items } })}
              addLabel="Add Enterprise Item"
              placeholder="Enterprise item"
            />
            </>
          )}

          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold">
              {saveState === 'saving' ? 'Saving...' : 'Save Services Page'}
            </button>
            {section === 'Service Details' && (
              <button type="button" onClick={clearSection} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm">
                Clear Section
              </button>
            )}
            {saveState === 'saved' && <span className="text-sm text-emerald-600">Saved</span>}
            {saveState === 'error' && <span className="text-sm text-red-600">Save failed</span>}
          </div>
        </form>
      )}
    </div>
  );
};
