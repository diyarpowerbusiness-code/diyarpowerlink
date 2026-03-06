import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' } // admin | super
  },
  { timestamps: true }
);

export const AdminUser = mongoose.model('AdminUser', AdminUserSchema);
