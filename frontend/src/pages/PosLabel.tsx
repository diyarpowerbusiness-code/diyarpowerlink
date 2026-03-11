import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import JsBarcode from 'jsbarcode';
import { API_BASE } from '../api';
import { Product } from '../types';
import { resolveImageUrl } from '../utils/media';

const useQuery = () => new URLSearchParams(useLocation().search);

export const PosLabel = () => {
  const query = useQuery();
  const productId = query.get('productId') || '';
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!productId) return;
    fetch(`${API_BASE}/api/products/${productId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setProduct(data))
      .catch(() => null);
  }, [productId]);

  const barcodeValue = useMemo(() => {
    return (product as any)?.sku || (product as any)?.barcodeValue || (product as any)?._id || (product as any)?.id || '';
  }, [product]);

  const labels = useMemo(() => Array.from({ length: Math.max(1, qty) }), [qty]);
  const svgRefs = useRef<SVGSVGElement[]>([]);

  useEffect(() => {
    if (!barcodeValue) return;
    svgRefs.current.forEach((svg) => {
      if (!svg) return;
      try {
        JsBarcode(svg, barcodeValue, {
          format: 'CODE128',
          displayValue: false,
          height: 60,
          width: 2,
          margin: 0
        });
      } catch {
        // ignore render errors
      }
    });
  }, [barcodeValue, labels.length]);

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .pos-print-area, .pos-print-area * { visibility: visible; }
          .pos-print-area { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; }
          .pos-label { box-shadow: none !important; border: 1px solid #000 !important; }
        }
      `}</style>
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/products" className="text-sm text-slate-500 hover:text-slate-700">Back to Products</Link>
            <button onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
              Print POS Label
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <h1 className="text-2xl font-bold text-slate-900">POS Barcode Label</h1>
                <p className="text-sm text-slate-500">Generate and print product labels.</p>
              </div>
              <div className="flex items-center gap-2 justify-start md:justify-end">
                <label className="text-sm text-slate-600">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-24 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {!product ? (
            <div className="text-center text-slate-600 py-10">Loading product...</div>
          ) : (
            <div className="pos-print-area">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {labels.map((_, idx) => (
                  <div key={idx} className="pos-label bg-white border border-slate-200 rounded-2xl p-6 shadow-sm w-[320px]">
                    <div className="flex items-center gap-3 mb-4">
                      {(product as any).images?.[0] && (
                        <img src={resolveImageUrl((product as any).images[0])} alt={product.name} className="w-10 h-10 object-contain" />
                      )}
                      <div>
                        <p className="text-xs text-slate-500">DIYAR POWER LINK</p>
                        <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-700 space-y-1 mb-4">
                      <div>Product: <span className="font-semibold text-slate-900">{product.name}</span></div>
                      <div>Price: <span className="font-semibold text-slate-900">₹{(product as any).price ?? 0}</span></div>
                      <div>SKU: <span className="font-semibold text-slate-900">{barcodeValue}</span></div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-center">
                      <svg ref={(el) => { if (el) svgRefs.current[idx] = el; }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
