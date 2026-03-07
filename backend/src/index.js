import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

import { Product } from './models/Product.js';
import { BusinessArea } from './models/BusinessArea.js';
import { Service } from './models/Service.js';
import { Partner } from './models/Partner.js';
import { Message } from './models/Message.js';
import { Media } from './models/Media.js';
import { Settings } from './models/Settings.js';
import { Category } from './models/Category.js';
import { AdminUser } from './models/AdminUser.js';
import { defaultCategories, defaultBusinessAreas, defaultServices, defaultPartners, defaultProducts } from './seed/defaults.js';
import { defaultSettings } from './seed/defaultSettings.js';

dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 4000;

const rawOrigins = process.env.CORS_ORIGINS || '';
const allowedOrigins = rawOrigins
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = process.env.UPLOAD_DIR
  ? process.env.UPLOAD_DIR
  : (process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, '..', 'uploads'));
// Ensure uploads directory exists for multer
fs.mkdir(uploadsDir, { recursive: true }).catch(() => {});
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});
const upload = multer({ storage });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@diyarpowerlink.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '0', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || '';
const CONTACT_TO = process.env.CONTACT_TO || '';
const SMTP_SECURE = (process.env.SMTP_SECURE || '').toLowerCase() === 'true';

const canSendEmail = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM && CONTACT_TO);
const mailer = canSendEmail
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE || SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    })
  : null;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'diyar-power-link';
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || '';
const BACKEND_PUBLIC_URL = process.env.BACKEND_PUBLIC_URL || '';
const useCloudinary = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);

if (useCloudinary) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  });
}

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Auth
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const dbUser = await AdminUser.findOne({ email });
  if (dbUser) {
    const valid = await bcrypt.compare(password, dbUser.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ email, role: dbUser.role }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token });
  }

  if (email !== ADMIN_EMAIL) return res.status(401).json({ error: 'Invalid credentials' });

  let valid = false;
  if (ADMIN_PASSWORD_HASH) {
    valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } else {
    valid = password === ADMIN_PASSWORD;
  }

  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ email, role: 'super' }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

// Dashboard summary
app.get('/api/dashboard/summary', requireAuth, async (_req, res) => {
  const [products, categories, messages] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Message.countDocuments()
  ]);

  res.json({
    totalProducts: products,
    totalCategories: categories,
    totalMessages: messages,
    recentUpdates: new Date().toISOString()
  });
});

// Categories CRUD (public GET)
app.get('/api/categories', async (_req, res) => res.json(await Category.find().sort({ createdAt: -1 })));
app.post('/api/categories', requireAuth, async (req, res) => res.json(await Category.create(req.body)));
app.put('/api/categories/:id', requireAuth, async (req, res) => res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/categories/:id', requireAuth, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Products CRUD (public GET)
app.get('/api/products', async (_req, res) => res.json(await Product.find().sort({ createdAt: -1 })));
app.post('/api/products', requireAuth, async (req, res) => res.json(await Product.create(req.body)));
app.put('/api/products/:id', requireAuth, async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/products/:id', requireAuth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Business Areas CRUD (public GET)
app.get('/api/business-areas', async (_req, res) => res.json(await BusinessArea.find().sort({ createdAt: -1 })));
app.post('/api/business-areas', requireAuth, async (req, res) => res.json(await BusinessArea.create(req.body)));
app.put('/api/business-areas/:id', requireAuth, async (req, res) => res.json(await BusinessArea.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/business-areas/:id', requireAuth, async (req, res) => {
  await BusinessArea.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Services CRUD (public GET)
app.get('/api/services', async (_req, res) => res.json(await Service.find().sort({ createdAt: -1 })));
app.post('/api/services', requireAuth, async (req, res) => res.json(await Service.create(req.body)));
app.put('/api/services/:id', requireAuth, async (req, res) => res.json(await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/services/:id', requireAuth, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Partners CRUD (public GET)
app.get('/api/partners', async (_req, res) => res.json(await Partner.find().sort({ createdAt: -1 })));
app.post('/api/partners', requireAuth, async (req, res) => res.json(await Partner.create(req.body)));
app.put('/api/partners/:id', requireAuth, async (req, res) => res.json(await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/partners/:id', requireAuth, async (req, res) => {
  await Partner.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Settings (public GET)
app.get('/api/settings', async (_req, res) => {
  const settings = await Settings.findOne();
  res.json(settings || {});
});
app.put('/api/settings', requireAuth, async (req, res) => {
  const existing = await Settings.findOne();
  if (existing) {
    const updated = await Settings.findByIdAndUpdate(existing._id, req.body, { new: true });
    return res.json(updated);
  }
  res.json(await Settings.create(req.body));
});

// Media
app.get('/api/media', requireAuth, async (_req, res) => res.json(await Media.find().sort({ createdAt: -1 })));
app.post('/api/media', requireAuth, upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'File required' });
  if (useCloudinary) {
    try {
      const uploaded = await cloudinary.uploader.upload(file.path, {
        folder: CLOUDINARY_FOLDER,
        resource_type: 'image'
      });
      const doc = await Media.create({
        filename: file.originalname,
        url: uploaded.secure_url,
        mimetype: file.mimetype,
        size: file.size
      });
      return res.json(doc);
    } catch (err) {
      return res.status(500).json({ error: 'Cloud upload failed' });
    }
  }

  const url = `/uploads/${file.filename}`;
  const doc = await Media.create({ filename: file.originalname, url, mimetype: file.mimetype, size: file.size });
  res.json(doc);
});
app.post('/api/media/import-assets', requireAuth, async (_req, res) => {
  const assetsRoot = path.join(__dirname, '..', '..', 'frontend', 'public', 'assets');
  const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);
  let created = 0;

  const walk = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (!allowed.has(ext)) continue;
      const stat = await fs.stat(full);
      const existing = await Media.findOne({ filename: entry.name, size: stat.size });
      if (existing) continue;
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const dest = path.join(uploadsDir, unique);
      await fs.copyFile(full, dest);
      const url = `/uploads/${unique}`;
      await Media.create({ filename: entry.name, url, mimetype: `image/${ext.replace('.', '')}`, size: stat.size });
      created += 1;
    }
  };

  try {
    await walk(assetsRoot);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to import assets' });
  }

  res.json({ success: true, created });
});
app.delete('/api/media/:id', requireAuth, async (req, res) => {
  await Media.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Migrate existing image URLs to Cloudinary
app.post('/api/media/migrate', requireAuth, async (_req, res) => {
  if (!useCloudinary) return res.status(400).json({ error: 'Cloudinary not configured' });
  if (!PUBLIC_SITE_URL || !BACKEND_PUBLIC_URL) {
    return res.status(400).json({ error: 'PUBLIC_SITE_URL and BACKEND_PUBLIC_URL are required' });
  }

  let updated = 0;
  const failures = [];

  const resolveRemote = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/assets')) return `${PUBLIC_SITE_URL}${url}`;
    if (url.startsWith('/uploads')) return `${BACKEND_PUBLIC_URL}${url}`;
    return '';
  };

  const shouldSkip = (url) => !url || url.includes('res.cloudinary.com');

  const uploadUrl = async (url) => {
    const remote = resolveRemote(url);
    if (!remote) return '';
    const uploaded = await cloudinary.uploader.upload(remote, {
      folder: CLOUDINARY_FOLDER,
      resource_type: 'image'
    });
    return uploaded.secure_url || '';
  };

  const migrateField = async (doc, field) => {
    const value = doc[field];
    if (shouldSkip(value)) return false;
    try {
      const newUrl = await uploadUrl(value);
      if (newUrl) {
        doc[field] = newUrl;
        updated += 1;
        return true;
      }
    } catch (err) {
      failures.push({ field, value, error: err?.message || 'upload failed' });
    }
    return false;
  };

  const migrateArrayField = async (doc, field) => {
    const arr = doc[field];
    if (!Array.isArray(arr) || arr.length === 0) return false;
    let changed = false;
    const next = [];
    for (const item of arr) {
      if (shouldSkip(item)) {
        next.push(item);
        continue;
      }
      try {
        const newUrl = await uploadUrl(item);
        next.push(newUrl || item);
        if (newUrl) {
          updated += 1;
          changed = true;
        }
      } catch (err) {
        failures.push({ field, value: item, error: err?.message || 'upload failed' });
        next.push(item);
      }
    }
    if (changed) doc[field] = next;
    return changed;
  };

  // Settings images
  const settings = await Settings.findOne();
  if (settings) {
    let changed = false;
    changed = (await migrateField(settings, 'logo')) || changed;
    if (settings.home) {
      changed = (await migrateField(settings.home, 'heroBackgroundImage')) || changed;
      changed = (await migrateField(settings.home, 'whoImage')) || changed;
    }
    if (settings.about) {
      changed = (await migrateField(settings.about, 'heroImage')) || changed;
      changed = (await migrateField(settings.about, 'image')) || changed;
    }
    if (changed) await settings.save();
  }

  // Categories
  const categories = await Category.find();
  for (const cat of categories) {
    const changed = await migrateField(cat, 'image');
    if (changed) await cat.save();
  }

  // Business Areas
  const areas = await BusinessArea.find();
  for (const area of areas) {
    const changed = await migrateField(area, 'image');
    if (changed) await area.save();
  }

  // Partners
  const partners = await Partner.find();
  for (const partner of partners) {
    const changed = await migrateField(partner, 'logo');
    if (changed) await partner.save();
  }

  // Products
  const products = await Product.find();
  for (const product of products) {
    let changed = false;
    changed = (await migrateArrayField(product, 'images')) || changed;
    if (changed) await product.save();
  }

  res.json({ success: true, updated, failures });
});

// Messages
app.get('/api/messages', requireAuth, async (_req, res) => res.json(await Message.find().sort({ createdAt: -1 })));
app.patch('/api/messages/:id', requireAuth, async (req, res) => res.json(await Message.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/messages/:id', requireAuth, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Admin Users
app.get('/api/admin-users', requireAuth, async (_req, res) => {
  const users = await AdminUser.find().sort({ createdAt: -1 }).select('-passwordHash');
  res.json(users);
});
app.post('/api/admin-users', requireAuth, async (req, res) => {
  const { name, email, password, role } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const exists = await AdminUser.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const created = await AdminUser.create({ name: name || '', email, passwordHash, role: role || 'admin' });
  res.json({ _id: created._id, name: created.name, email: created.email, role: created.role, createdAt: created.createdAt });
});
app.put('/api/admin-users/:id', requireAuth, async (req, res) => {
  const { name, email, password, role } = req.body || {};
  const update = { };
  if (name !== undefined) update.name = name;
  if (email !== undefined) update.email = email;
  if (role !== undefined) update.role = role;
  if (password) update.passwordHash = await bcrypt.hash(password, 10);
  const updated = await AdminUser.findByIdAndUpdate(req.params.id, update, { new: true }).select('-passwordHash');
  res.json(updated);
});
app.delete('/api/admin-users/:id', requireAuth, async (req, res) => {
  await AdminUser.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Public contact form
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' });
  const saved = await Message.create(req.body);

  if (mailer) {
    const subject = req.body.subject || 'New Contact Form Submission';
    const phone = req.body.phone || 'N/A';
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      req.body.message || ''
    ];

    mailer
      .sendMail({
        from: SMTP_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject: `[Diyar Power Link] ${subject}`,
        text: lines.join('\n')
      })
      .catch((err) => console.error('Email send failed', err));
  }

  res.json(saved);
});

// Health
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Diyar backend running' });
});

const start = async () => {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    console.error('Missing MONGODB_URI in environment');
    process.exit(1);
  }
  await mongoose.connect(uri);
  await seedDefaults();
  app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
};

start();

async function seedDefaults() {
  const [catCount, areaCount, serviceCount, partnerCount, productCount, settingsCount, adminCount] = await Promise.all([
    Category.countDocuments(),
    BusinessArea.countDocuments(),
    Service.countDocuments(),
    Partner.countDocuments(),
    Product.countDocuments(),
    Settings.countDocuments(),
    AdminUser.countDocuments()
  ]);

  if (catCount === 0) await Category.insertMany(defaultCategories);
  if (areaCount === 0) await BusinessArea.insertMany(defaultBusinessAreas);
  if (serviceCount === 0) await Service.insertMany(defaultServices);
  if (partnerCount === 0) await Partner.insertMany(defaultPartners);
  if (productCount === 0) await Product.insertMany(defaultProducts);
  if (settingsCount === 0) {
    await Settings.create(defaultSettings);
  } else {
    const settings = await Settings.findOne();
    if (settings && !settings.logo) {
      settings.logo = defaultSettings.logo;
      await settings.save();
    }
  }
  if (adminCount === 0) {
    const passwordHash = ADMIN_PASSWORD_HASH || (ADMIN_PASSWORD ? await bcrypt.hash(ADMIN_PASSWORD, 10) : '');
    if (ADMIN_EMAIL && passwordHash) {
      await AdminUser.create({ name: 'Administrator', email: ADMIN_EMAIL, passwordHash, role: 'super' });
    }
  }
}
