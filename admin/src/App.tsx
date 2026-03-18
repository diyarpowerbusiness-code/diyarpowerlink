import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminHomePage } from './admin/AdminHomePage';
import { AdminAboutPage } from './admin/AdminAboutPage';
import { AdminProductsPage } from './admin/AdminProductsPage';
import { AdminServicesPage } from './admin/AdminServicesPage';
import { AdminContactPage } from './admin/AdminContactPage';
import { AdminMedia } from './admin/AdminMedia';
import { AdminSettings } from './admin/AdminSettings';
import { AdminUsers } from './admin/AdminUsers';
import { AdminReviews } from './admin/AdminReviews';
import { pingApi } from './api';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoot = () => (
  <RequireAdmin>
    <AdminLayout />
  </RequireAdmin>
);

export default function App() {
  useEffect(() => {
    pingApi();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<AdminRoot />}>
          <Route index element={<AdminDashboard />} />
          <Route path="homepage" element={<AdminHomePage />} />
          <Route path="about-page" element={<AdminAboutPage />} />
          <Route path="products-page" element={<AdminProductsPage />} />
          <Route path="services-page" element={<AdminServicesPage />} />
          <Route path="contact-page" element={<AdminContactPage />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="admins" element={<AdminUsers />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
