import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginPath = location.pathname.startsWith('/admin') ? '/admin/login' : '/login';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate(loginPath, { replace: true });
      return;
    }
    fetch(`${API_BASE}/api/dashboard/summary`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (!res.ok) {
        localStorage.removeItem('admin_token');
        navigate(loginPath, { replace: true });
      }
    }).catch(() => {
      // If backend is down, keep user here so they can start it
    });
  }, [navigate, loginPath]);

  const onLogout = () => {
    localStorage.removeItem('admin_token');
    navigate(loginPath, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden lg:block shadow-lg shadow-slate-200/40">
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
          <Link
            to="/homepage"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/homepage'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Home Page
          </Link>
          <Link
            to="/services-page"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/services-page'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Services
          </Link>
          <Link
            to="/products-page"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/products-page'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Products
          </Link>
          <Link
            to="/about-page"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/about-page'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            About
          </Link>
          <Link
            to="/contact-page"
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${location.pathname === '/contact-page'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            Contact
          </Link>
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
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
