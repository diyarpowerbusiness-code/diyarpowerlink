import React, { useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES } from '../constants';
import { SectionHeader } from '../components/UI';
import { Link } from 'react-router-dom';
import { API_BASE } from '../api';
import { getCategoryFallbackImage, resolveImageUrl } from '../utils/media';

export const Products = () => {
  const [categories, setCategories] = useState<any[]>(PRODUCT_CATEGORIES.map((c) => ({
    name: c.title,
    slug: c.slug,
    description: c.description,
    image: c.image
  })));
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const featured = data.filter((c) => c.featured);
          const rest = data.filter((c) => !c.featured);
          setCategories(featured.length > 0 ? [...featured, ...rest] : data);
        }
      })
      .catch(() => null);
    fetch(`${API_BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => data && Object.keys(data).length > 0 && setSettings(data))
      .catch(() => null);
  }, []);

  const productsPage = settings.productsPage || {};
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
    return () => window.clearTimeout(timer);
  }, [categories.length]);
  const isPosBarcodeCategory = (category: any) => {
    const name = String(category?.name || '').toLowerCase();
    const slug = String(category?.slug || '').toLowerCase();
    return (
      slug === 'pos-barcode-products' ||
      slug === 'pos-paper-roll-and-barcode-labels' ||
      (name.includes('pos') && name.includes('barcode')) ||
      (name.includes('paper roll') && name.includes('barcode'))
    );
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary py-16 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6">
            {productsPage.heroTitle || 'Our Product Categories'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {productsPage.heroSubtitle || 'Explore our professional B2B catalog organized by category for quick selection and procurement.'}
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={productsPage.sectionTitle || 'Browse by Category'}
            subtitle={productsPage.sectionSubtitle || 'Select a category to view products in a clean, structured grid.'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const card = (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    {(() => {
                      const fallback = getCategoryFallbackImage(category.name);
                      const src = resolveImageUrl(category.image || fallback);
                      return (
                        <img
                          src={src}
                          alt={category.name}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = fallback;
                          }}
                        />
                      );
                    })()}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-display font-bold text-primary mb-2">{category.name}</h3>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">{category.description}</p>
                    <Link
                      to={`/products/category/${category.slug}`}
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              );

              if (isPosBarcodeCategory(category)) {
                return (
                  <div key={`${category.slug}-anchor`} id="pos-barcode-products" className="contents">
                    {card}
                  </div>
                );
              }

              return <React.Fragment key={category.slug}>{card}</React.Fragment>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
