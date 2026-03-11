import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, default: '' },
    price: { type: Number, default: 0 },
    barcodeValue: { type: String, default: '' },
    barcodeFormat: { type: String, default: 'CODE128' },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);
