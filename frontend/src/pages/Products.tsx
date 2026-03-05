import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../constants';
import { SectionHeader } from '../components/UI';
import { ArrowRight } from 'lucide-react';

export const Products = () => {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary py-16 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6">Our Product Categories</h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Explore our professional B2B catalog organized by category for quick selection and procurement.
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Browse by Category"
            subtitle="Select a category to view products in a clean, structured grid."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCT_CATEGORIES.map((category) => (
              <div
                key={category.slug}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden bg-white">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display font-bold text-primary mb-3">{category.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">{category.description}</p>
                  <Link
                    to={`/products/category/${category.slug}`}
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
                  >
                    View Products
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
