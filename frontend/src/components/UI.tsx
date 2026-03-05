import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, Service } from '../types';

export const SectionHeader = ({ title, subtitle, centered = true, light = false }: { title: string, subtitle?: string, centered?: boolean, light?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h2
      className={`text-3xl md:text-4xl font-display font-bold mb-4 ${light ? 'text-white' : 'text-primary'}`}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={`max-w-2xl text-lg ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600'}`}
      >
        {subtitle}
      </p>
    )}
    <div className={`h-1 w-20 bg-blue-600 mt-6 ${centered ? 'mx-auto' : ''}`} />
  </div>
);

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const isDocxImage = product.image.startsWith('/assets/docx/');

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover flex flex-col h-full"
    >
      <div className={`aspect-[4/3] overflow-hidden ${isDocxImage ? 'bg-white' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full transition-transform duration-500 hover:scale-105 ${isDocxImage ? 'object-cover object-top scale-105' : 'object-cover'}`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{product.category}</span>
        <h3 className="text-xl font-display font-bold text-primary mb-3">{product.name}</h3>
        <p className="text-slate-600 text-sm mb-4 flex-grow">{product.description}</p>
        {product.features && (
          <ul className="space-y-2 mb-6">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-center text-xs text-slate-500">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                {f}
              </li>
            ))}
          </ul>
        )}
      <Link
        to={`/products/${product.id}`}
        className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors text-center block"
      >
        Learn More
      </Link>
      </div>
    </div>
  );
};

export const CatalogProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const isDocxImage = product.image.startsWith('/assets/docx/');

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className={`aspect-[4/3] overflow-hidden ${isDocxImage ? 'bg-white' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full ${isDocxImage ? 'object-cover object-top scale-105' : 'object-cover'}`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-display font-bold text-primary mb-2">{product.name}</h3>
        <p className="text-sm text-slate-600 mb-6 flex-grow">{product.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to={`/products/${product.id}`}
            className="py-2.5 rounded-lg text-sm font-semibold text-primary border border-slate-200 hover:bg-slate-50 transition-colors text-center"
          >
            Learn More
          </Link>
          <Link
            to="/contact"
            className="py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-center"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;

  return (
    <div
      className="bg-white p-8 rounded-2xl border border-slate-100 card-hover"
    >
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
        <IconComponent size={32} />
      </div>
      <h3 className="text-xl font-display font-bold text-primary mb-4">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        {service.description}
      </p>
    </div>
  );
};
