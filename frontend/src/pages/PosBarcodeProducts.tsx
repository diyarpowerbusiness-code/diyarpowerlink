import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../constants';
import { CatalogProductCard, SectionHeader } from '../components/UI';
import { ArrowLeft } from 'lucide-react';
import { API_BASE } from '../api';
import { resolveImageUrl } from '../utils/media';

export const PosBarcodeProducts = () => {
  const [category, setCategory] = useState<any>(
    PRODUCT_CATEGORIES.find((c) => {
      const slug = String(c.slug || '').toLowerCase();
      const title = String(c.title || '').toLowerCase();
      return (
        slug === 'pos-barcode-products' ||
        slug === 'pos-paper-roll-and-barcode-labels' ||
        (slug.includes('pos') && slug.includes('barcode')) ||
        (title.includes('pos') && title.includes('barcode')) ||
        (title.includes('paper roll') && title.includes('barcode')) ||
        (title.includes('paper roll') && title.includes('label'))
      );
    })
  );
  const [products, setProducts] = useState<any[]>(PRODUCTS);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setProducts(data))
      .catch(() => null);
    fetch(`${API_BASE}/api/categories`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const found = data.find((c: any) => {
            const slug = String(c.slug || '').toLowerCase();
            const name = String(c.name || c.title || '').toLowerCase();
            return (
              slug === 'pos-barcode-products' ||
              slug === 'pos-paper-roll-and-barcode-labels' ||
              (slug.includes('pos') && slug.includes('barcode')) ||
              (name.includes('pos') && name.includes('barcode')) ||
              (name.includes('paper roll') && name.includes('barcode')) ||
              (name.includes('paper roll') && name.includes('label'))
            );
          });
          if (found) setCategory(found);
        }
      })
      .catch(() => null);
  }, []);

  const categoryName = category?.title || category?.name || 'POS Paper Roll and Barcode Labels';
  const categoryNameLower = String(categoryName).toLowerCase();
  const keywordMatch = (input: string) => {
    const value = input.toLowerCase();
    if (value.includes('pos') && value.includes('barcode')) return true;
    if (value.includes('paper roll') && (value.includes('barcode') || value.includes('label'))) return true;
    if (value.includes('thermal') && (value.includes('roll') || value.includes('label'))) return true;
    if (value.includes('barcode label') || value.includes('barcode labels')) return true;
    return false;
  };
  const categoryProducts = products.filter((p) => {
    const categoryValue = String(p.category || '').toLowerCase();
    const normalizedCategory = categoryValue.replace(/[-_]/g, ' ');
    if (categoryValue === categoryNameLower) return true;
    if (keywordMatch(categoryValue) || keywordMatch(normalizedCategory)) return true;
    const nameValue = String(p.name || '').toLowerCase();
    const descValue = String(p.description || '').toLowerCase();
    return keywordMatch(nameValue) || keywordMatch(descValue);
  });

  if (!category && categoryProducts.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-slate-50">
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Category Not Found</h1>
            <p className="text-slate-600 mb-8">
              The POS Paper Roll and Barcode Labels category is not available yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all"
            >
              Back to Categories
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {category?.image ? (
            <img src={resolveImageUrl(category.image)} alt={category.title} className="w-full h-full object-cover" />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
              alt="POS barcode products"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/products" className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Categories
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">{category.title || category.name || 'POS Paper Roll and Barcode Labels'}</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
            {category.description || 'Explore POS paper rolls, barcode labels, and related supplies for retail and enterprise operations.'}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={`${category.title || category.name} Products`}
            subtitle="Explore the full range of products in this category."
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
