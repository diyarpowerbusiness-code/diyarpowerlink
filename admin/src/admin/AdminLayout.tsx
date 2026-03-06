import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { API_BASE } from '../api';

const groups = [
  {
    name: 'Home Page',
    items: [
      { name: 'Hero Section', path: '/homepage?tab=Hero%20Section' },
      { name: 'Hero Buttons & Badges', path: '/homepage?tab=Hero%20Buttons%20&%20Badges' },
      { name: 'Background Images', path: '/homepage?tab=Background%20Images' },
      { name: 'Who We Are', path: '/homepage?tab=Who%20We%20Are' },
      { name: 'Business Areas', path: '/homepage?tab=Business%20Areas' },
      { name: 'Services Preview', path: '/homepage?tab=Services%20Preview' },
      { name: 'Products Preview', path: '/homepage?tab=Products%20Preview' },
      { name: 'Why Choose Us', path: '/homepage?tab=Why%20Choose%20Us' },
      { name: 'Partners / Brand Logos', path: '/homepage?tab=Partners%20/%20Brand%20Logos' }
    ]
  },
  {
    name: 'About Page',
    items: [
      { name: 'Company Overview', path: '/about-page?tab=Company%20Overview' },
      { name: 'Vision', path: '/about-page?tab=Vision/Mission/Philosophy' },
      { name: 'Mission', path: '/about-page?tab=Vision/Mission/Philosophy' },
      { name: 'Philosophy', path: '/about-page?tab=Vision/Mission/Philosophy' }
    ]
  },
  {
    name: 'Products Page',
    items: [
      { name: 'Product Categories', path: '/products-page?tab=Product%20Categories' },
      { name: 'Products List', path: '/products-page?tab=Products%20List' }
    ]
  },
  {
    name: 'Services Page',
    items: [
      { name: 'Services List', path: '/services-page?tab=Services%20List' },
      { name: 'Service Details', path: '/services-page?tab=Service%20Details' }
    ]
  },
  {
    name: 'Contact Page',
    items: [
      { name: 'Contact Information', path: '/contact-page?tab=Contact%20Details' },
      { name: 'Messages', path: '/contact-page?tab=Messages' }
    ]
  }
];

export const AdminLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState<Record<string, boolean>>({
    'Home Page': false,
    'About Page': false,
    'Products Page': false,
    'Services Page': false,
    'Contact Page': false
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetch(`${API_BASE}/api/dashboard/summary`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (!res.ok) {
        localStorage.removeItem('admin_token');
        window.location.href = '/login';
      }
    }).catch(() => {
      // If backend is down, keep user here so they can start it
    });
  }, []);

  const onLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden lg:block">
        <div className="text-lg font-bold text-slate-900 mb-8">Admin Panel</div>
        <nav className="space-y-2">
          <Link
            to="/"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Dashboard
          </Link>
          {groups.map((group) => (
            <div key={group.name} className="border border-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setOpen((prev) => ({ ...prev, [group.name]: !prev[group.name] }))}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                {group.name}
              </button>
              {open[group.name] && (
                <div className="px-2 pb-2 space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-3 py-2 rounded-lg text-sm ${location.pathname === item.path
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/media"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/media'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Media Library
          </Link>
          <Link
            to="/settings"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/settings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Settings
          </Link>
        </nav>
        <button
          onClick={onLogout}
          className="mt-8 w-full text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl py-2"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};
