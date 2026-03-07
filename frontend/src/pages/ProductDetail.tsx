import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../constants';
import { SectionHeader } from '../components/UI';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { API_BASE } from '../api';
import { getCategoryFallbackImage, resolveImageUrl } from '../utils/media';

export const ProductDetail = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState<any[]>(PRODUCTS);
  const [categories, setCategories] = useState<any[]>(PRODUCT_CATEGORIES);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setProducts(data))
      .catch(() => null);
    fetch(`${API_BASE}/api/categories`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setCategories(data))
      .catch(() => null);
  }, []);

  const product = products.find((p) => (p._id || p.id) === productId);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-slate-50">
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Product Not Found</h1>
            <p className="text-slate-600 mb-8">
              The product you are looking for does not exist or may have been moved.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all"
            >
              Back to Products
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const category = categories.find((c: any) => (c.title || c.name) === product.category);
  const related = products
    .filter((p) => p.category === product.category && (p._id || p.id) !== (product._id || product.id))
    .slice(0, 3);

  const rawProductImage = product.image || product.images?.[0] || getCategoryFallbackImage(product.category);
  const productImage = resolveImageUrl(rawProductImage);
  const isDocxImage = rawProductImage.startsWith('/assets/docx/');

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-primary py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/products" className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">{product.name}</h1>
          <p className="text-base sm:text-lg text-slate-300 mt-3 max-w-2xl">{product.description}</p>
        </div>
      </section>

      {/* Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className={`rounded-3xl border border-slate-100 overflow-hidden ${isDocxImage ? 'bg-slate-50' : 'bg-white'}`}>
              <div className="aspect-[4/3] w-full">
                <img
                  src={productImage}
                  alt={product.name}
                  className={`w-full h-full ${isDocxImage ? 'object-contain p-6' : 'object-cover'}`}
                />
              </div>
            </div>
            <div>
              <span className="inline-flex items-center text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                {product.name}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                {product.description}
              </p>
              {product.features && (
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="text-lg font-semibold text-primary mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all"
                >
                  Request a Quote
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center w-full sm:w-auto border border-slate-200 text-primary px-8 py-3 rounded-full font-semibold hover:bg-slate-50 transition-all"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Related Products"
              subtitle={category ? `More from ${category.title}` : `More from ${product.category}`}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item._id || item.id}
                  to={`/products/${item._id || item.id}`}
                  className="bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className={`aspect-[4/3] ${(item.image || item.images?.[0] || getCategoryFallbackImage(item.category)).startsWith('/assets/docx/') ? 'bg-slate-50' : 'bg-white'}`}>
                    <img
                      src={resolveImageUrl(item.image || item.images?.[0] || getCategoryFallbackImage(item.category))}
                      alt={item.name}
                      className={`w-full h-full ${(item.image || item.images?.[0] || getCategoryFallbackImage(item.category)).startsWith('/assets/docx/') ? 'object-contain p-4' : 'object-cover'}`}
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{item.category}</p>
                    <h4 className="text-lg font-display font-bold text-primary">{item.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
