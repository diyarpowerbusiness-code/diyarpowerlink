import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { CatalogProductCard, SectionHeader } from '../components/UI';
import { ArrowLeft } from 'lucide-react';
import { API_BASE } from '../api';

export const PosBarcodeProducts = () => {
  const [products, setProducts] = useState<any[]>(PRODUCTS);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setProducts(data))
      .catch(() => null);
  }, []);

  const categoryProducts = products.filter((p) => {
    const value = String(p.category || '').toLowerCase();
    return value === 'paper products' || value === 'thermal labels';
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
            alt="POS barcode products"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/products" className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Categories
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">POS Paper Roll and Barcode Labels</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
            Explore POS paper rolls, barcode labels, and related supplies for retail and enterprise operations.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="POS Paper Roll and Barcode Labels"
            subtitle="Explore the full range of products in this section."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <CatalogProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
