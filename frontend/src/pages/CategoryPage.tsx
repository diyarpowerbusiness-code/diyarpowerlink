import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../constants';
import { CatalogProductCard, SectionHeader } from '../components/UI';
import { ArrowLeft } from 'lucide-react';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="pt-24 min-h-screen bg-slate-50">
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Category Not Found</h1>
            <p className="text-slate-600 mb-8">
              The category you are looking for does not exist or may have been moved.
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

  const categoryProducts = PRODUCTS.filter((p) => category.productIds.includes(p.id));

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/products" className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Categories
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3">{category.title}</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={`${category.title} Products`}
            subtitle="Explore the full range of products in this category."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <CatalogProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
