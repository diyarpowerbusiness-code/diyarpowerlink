import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown, MapPin } from 'lucide-react';
import { COMPANY_NAME } from '../constants';
import { API_BASE } from '../api';
import { resolveImageUrl } from '../utils/media';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const [categories, setCategories] = useState<any[]>([
    { name: 'IT Solutions', slug: 'it-solutions' },
    { name: 'Paper Products', slug: 'paper-products' },
    { name: 'Medical Supplies', slug: 'medical-supplies' },
    { name: 'Packaging Materials', slug: 'packaging-materials' }
  ]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => data && Object.keys(data).length > 0 && setSettings(data))
      .catch(() => null);
    fetch(`${API_BASE}/api/categories`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setCategories(data))
      .catch(() => null);
  }, []);

  const companyName = settings.websiteName || COMPANY_NAME;
  const fallbackLogo = '/assets/partners/diyar-logo.jpg';
  const rawLogo = settings.logo || '';
  const logoUrl = rawLogo.includes('/uploads/') ? resolveImageUrl(fallbackLogo) : resolveImageUrl(rawLogo || fallbackLogo);

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-slate-200 py-3 shadow-sm' : 'bg-white/95 backdrop-blur border-b border-slate-200 py-4 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={companyName}
                className="w-11 h-11 object-contain rounded-lg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    target.src = fallbackLogo;
                  }
                }}
              />
            ) : (
              <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-bold text-xl">D</span>
              </div>
            )}
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
              {companyName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base font-semibold transition-colors hover:text-blue-600 ${
                location.pathname === '/' ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-base font-semibold transition-colors hover:text-blue-600 ${
                location.pathname === '/about' ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              About
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((v) => !v)}
                className={`text-base font-semibold transition-colors hover:text-blue-600 flex items-center gap-1 ${
                  location.pathname.startsWith('/products') ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                Products
                <ChevronDown size={16} />
              </button>
              {productsOpen && (
                <div className="absolute left-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-lg p-2">
                  <Link
                    to="/products"
                    onClick={() => setProductsOpen(false)}
                    className="block px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-slate-50 rounded-lg"
                  >
                    All Products
                  </Link>
                  {categories.map((item) => (
                    <Link
                      key={item.slug || item.name}
                      to={`/products/category/${item.slug}`}
                      onClick={() => setProductsOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/services"
              className={`text-base font-semibold transition-colors hover:text-blue-600 ${
                location.pathname === '/services' ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`text-base font-semibold transition-colors hover:text-blue-600 ${
                location.pathname === '/contact' ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="transition-colors text-slate-700"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium border-b border-slate-50 ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 pt-3">
              <p className="text-xs font-semibold text-slate-500 mb-2">Products</p>
              <div className="grid grid-cols-1 gap-1">
                {categories.map((item) => (
                  <Link
                    key={item.slug || item.name}
                    to={`/products/category/${item.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-4 px-3">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-medium"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => data && Object.keys(data).length > 0 && setSettings(data))
      .catch(() => null);
  }, []);

  const companyName = settings.websiteName || COMPANY_NAME;
  const mapQuery = encodeURIComponent(settings.contactAddress || 'Mahabubnagar, Telangana, India');
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={companyName}
                  className="w-8 h-8 object-contain rounded"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = '1';
                      target.src = fallbackLogo;
                    }
                  }}
                />
              ) : (
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-primary font-bold">D</span>
                </div>
              )}
              <span className="font-display font-bold text-lg tracking-tight">
                {companyName}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {settings.footerText || 'Diyar Power Link LLP and Diyar Computers: Your One Shop for All IT Needs. Providing high-quality IT hardware, specialized paper products, medical supplies, and industrial packaging solutions across India.'}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Our Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Our Divisions</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {(settings.footerDivisions && settings.footerDivisions.length > 0
                ? settings.footerDivisions
                : [
                    'IT Solutions & Infrastructure',
                    'Paper Products & Thermal Rolls',
                    'Medical Supplies & Wristbands',
                    'Packaging Materials & Tools',
                    'Technical Services & Support'
                  ]
              ).map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="mt-0.5" />
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {settings.contactAddress || 'Building 10-6-87/2, Street Rural Police Station, Srinivasa Colony, Mahabubnagar - 509001, Telangana, India'}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} />
                <a href={`tel:${settings.contactPhone || '+918688050498'}`} className="hover:text-white transition-colors">
                  {settings.contactPhone || '+91 8688050498'}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} />
                <a href={`mailto:${settings.contactEmail || 'info@diyarpowerlink.com'}`} className="hover:text-white transition-colors">
                  {settings.contactEmail || 'info@diyarpowerlink.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
