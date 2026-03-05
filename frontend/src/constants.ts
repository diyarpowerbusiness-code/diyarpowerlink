import { Product, Service, Partner } from './types';

export const COMPANY_NAME = "Diyar Power Link LLP";

export const PRODUCTS: Product[] = [
  // IT Hardware & Software
  {
    id: 'it1',
    name: 'Desktops & Laptops',
    category: 'IT Hardware & Software',
    description: 'Business & personal computing and portable computing solutions from leading global brands for enterprise productivity.',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80',
    features: ['Business Desktops', 'Portable Laptops', 'All-in-One Desktops', '2+ Year Manufacturer Warranty']
  },
  {
    id: 'it2',
    name: 'Printers & Monitors',
    category: 'IT Hardware & Software',
    description: 'Office printing solutions and professional display solutions for all business environments.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
    features: ['Laser Printers', 'Display Monitors', 'Projectors', 'UPS Systems']
  },
  {
    id: 'it3',
    name: 'Software Solutions',
    category: 'IT Hardware & Software',
    description: 'Genuine software licenses for productivity, creativity, design and security from top publishers.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    features: ['Microsoft Office', 'Adobe Creative Cloud', 'AutoCAD & 3D Studio', 'Kaspersky / ESET / Norton']
  },
  {
    id: 'it4',
    name: 'Network Solutions',
    category: 'IT Hardware & Software',
    description: 'Networking equipment for LAN environments including routers, switches, fibre optic accessories, and wireless access points.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    features: ['Routers & Switches', 'Fibre Optic Accessories', 'Wireless Access Points', 'Infrastructure Cabling']
  },

  // Paper Products
  {
    id: 'p1',
    name: 'Thermal Paper Rolls',
    category: 'Paper Products',
    description: 'Premium thermal paper rolls for POS, ATM, ECG and cinema ticket printing. BPA-free, fast response, eco-friendly and durable.',
    image: '/assets/docx/image1.png',
    features: ['80 & 57 Series', 'ATM & ECG Paper', 'Cinema Tickets', 'Jumbo Rolls Available']
  },
  {
    id: 'p2',
    name: 'Thermal Labels',
    category: 'Paper Products',
    description: 'High-quality thermal labels for shipping, inventory, retail and logistics. Strong adhesive, smudge-proof, in various sizes and shapes.',
    image: '/assets/docx/image3.png',
    features: ['Shipping Labels', 'A4 Labels', 'Linerless Labels', 'Custom Dymo & Package Labels']
  },
  {
    id: 'p3',
    name: 'Carbonless Paper (NCR)',
    category: 'Paper Products',
    description: 'Carbonless copy paper (NCR paper) for multi-part forms including invoices, receipts, orders and contracts. Eco-friendly and efficient.',
    image: '/assets/docx/image4.png',
    features: ['2, 3 & Multi-copy Sets', 'White, Pink, Yellow, Blue', 'Custom Size & Logo', 'Dot Matrix Compatible']
  },
  {
    id: 'p4',
    name: 'POS Printers',
    category: 'Paper Products',
    description: 'Professional POS printers from top brands: Zebra, Godex, TSC, TVS and Epson for retail and hospitality environments.',
    image: '/assets/docx/image9.png',
    features: ['Zebra & Godex', 'TSC & Epson', 'Desktop & Mobile', 'Label & Receipt Printers']
  },
  {
    id: 'p5',
    name: 'Custom Printed Thermal Rolls',
    category: 'Paper Products',
    description: 'Customized thermal rolls and branded paper products with your company logo and promotional messages.',
    image: '/assets/docx/image2.png',
    features: ['Custom Branding', 'High Quality Print', 'Promotional Use', 'Bulk Orders Available']
  },

  // Medical Supplies
  {
    id: 'm1',
    name: 'Patient ID Wristbands',
    category: 'Medical Supplies',
    description: 'Waterproof, tamper-proof and comfortable wristbands for accurate patient identification in healthcare facilities.',
    image: '/assets/docx/image11.png',
    features: ['Medical RFID Wristband', 'Mother Infant Wristband', 'Write-on & Alert Wristband', 'Tamper-proof Snap-on Design']
  },
  {
    id: 'm2',
    name: 'Disposable PPE Clothing',
    category: 'Medical Supplies',
    description: 'Full range of disposable protective clothing including coveralls, isolation gowns, aprons, caps and shoe covers.',
    image: '/assets/docx/image15.jpeg',
    features: ['CAT III Coveralls', 'SMS Isolation Gowns', 'Disposable Lab Coats', 'Aprons, Caps & Shoe Covers']
  },
  {
    id: 'm3',
    name: 'Hospital Consumables',
    category: 'Medical Supplies',
    description: 'Essential medical consumables including blood collection tubes, swabs, lancets, sterilization pouches and laboratory supplies.',
    image: '/assets/docx/image23.png',
    features: ['Vacuum Blood Collection Tubes', 'Medical Sterile Swabs', 'Sterilization Pouches/Bags', 'Lab Plastic Consumables']
  },
  {
    id: 'm4',
    name: 'Laboratory Supplies',
    category: 'Medical Supplies',
    description: 'Comprehensive laboratory supplies including test tubes, PCR tubes, centrifuge tubes, petri dishes and specimen containers.',
    image: '/assets/docx/image23.png',
    features: ['PCR Tubes & Strips', 'Centrifuge Tubes', 'Plastic Petri Dishes', 'Cryogenic Vials & Boxes']
  },

  // Packaging Solutions
  {
    id: 'pk1',
    name: 'Polyester Strapping Systems',
    category: 'Packaging Solutions',
    description: 'Composite, PET and Steel polyester strapping — as strong as steel, shock absorbent, weather resistant, eco-friendly and re-tensionable.',
    image: '/assets/docx/image27.jpeg',
    features: ['Composite Polyester (Cordstrap)', 'PET & PP Strapping', 'Steel Strapping', 'Certified by Germanischer Lloyd']
  },
  {
    id: 'pk2',
    name: 'Strapping Tools',
    category: 'Packaging Solutions',
    description: 'Battery-powered, pneumatic, and manual strapping tools (FROMM) for efficient and high-tension cargo securing.',
    image: '/assets/docx/image29.jpeg',
    features: ['Battery Tools (P318–P331)', 'Pneumatic Tools (P350–P380)', 'Manual Tools (P403–P404)', 'Friction Weld & Metal Seal']
  },
  {
    id: 'pk3',
    name: 'Stretch Film',
    category: 'Packaging Solutions',
    description: 'Cast stretch machine rolls and hand rolls — strong and clear film that sticks only to itself for safe pallet wrapping during transit.',
    image: '/assets/docx/image40.jpeg',
    features: ['Machine Rolls (Cast Stretch)', 'Hand Rolls (17–20 Micron)', 'Tear Resistant', 'Pallet Wrap & Logistics Use']
  },
  {
    id: 'pk4',
    name: 'Packaging Adhesive Tapes',
    category: 'Packaging Solutions',
    description: 'Full range of adhesive tapes: BOPP (clear & brown), masking tapes, aluminum tapes, duct/cloth tapes, and double sided tapes.',
    image: '/assets/docx/image41.png',
    features: ['BOPP Clear & Brown', 'Masking & Automotive Grade', 'Aluminum & Duct Tapes', 'Double-Sided Adhesive']
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'New Installations',
    description: 'All our products are genuine best quality items sourced directly from manufacturers. We promote brands that keep pace with technology innovation.',
    icon: 'PackagePlus'
  },
  {
    id: 's2',
    title: 'Meeting Your Needs',
    description: 'Our team has experience to recommend products that perform optimally and align with your business IT needs: durable, reliable, versatile and energy efficient.',
    icon: 'Target'
  },
  {
    id: 's3',
    title: 'Guaranteed Delivery',
    description: 'We guarantee our deliveries on the back of our proven track record. Dispatching, logistics and delivery — all part of our standard practice.',
    icon: 'Truck'
  },
  {
    id: 's4',
    title: 'Genuine Warranties',
    description: 'All our products are backed by genuine warranties with quick recovery from any component failure, minimizing your downtime.',
    icon: 'ShieldCheck'
  },
  {
    id: 's5',
    title: 'Hardware & Software Support',
    description: 'Every business requires technical support. Our technicians resolve any reported hardware and software issues quickly and efficiently.',
    icon: 'Wrench'
  },
  {
    id: 's6',
    title: 'Desktops & Servers Support',
    description: 'We offer onsite and remote support for desktops and servers, including troubleshooting, configuration changes, and backups.',
    icon: 'Server'
  },
  {
    id: 's7',
    title: 'Network Solutions',
    description: 'We distribute networking equipment for LAN environments including routers, switches, fibre optic accessories, and wireless access points.',
    icon: 'Network'
  },
  {
    id: 's8',
    title: 'IT Consultancy',
    description: 'Expert guidance to help you choose the right IT solutions. We plan and deploy cost-effective technology solutions tailored to your business.',
    icon: 'Lightbulb'
  }
];

export const PARTNERS: Partner[] = [
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg' },
  { name: 'Autodesk', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Autodesk_logo.svg' },
  { name: 'Kaspersky', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Kaspersky_Lab_logo.svg' },
  { name: 'ESET', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/ESET_logo.svg' },
  { name: 'Norton', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Norton_LifeLock_logo.svg' }
];

export const PRODUCT_CATEGORIES = [
  {
    slug: 'paper-products',
    title: 'Paper Products',
    description: 'Thermal rolls and carbonless paper solutions for retail, logistics, and healthcare.',
    image: '/assets/docx/image1.png',
    productIds: ['p1', 'p3', 'p5']
  },
  {
    slug: 'thermal-labels',
    title: 'Thermal Labels',
    description: 'Durable, high-adhesion labels for shipping, inventory, and retail applications.',
    image: '/assets/docx/image3.png',
    productIds: ['p2']
  },
  {
    slug: 'pos-printers',
    title: 'POS Printers',
    description: 'Reliable POS and label printers from leading global brands.',
    image: '/assets/docx/image9.png',
    productIds: ['p4']
  },
  {
    slug: 'medical-supplies',
    title: 'Medical Supplies',
    description: 'Patient ID wristbands, PPE clothing, and essential hospital consumables.',
    image: '/assets/docx/image11.png',
    productIds: ['m1', 'm2', 'm3', 'm4']
  },
  {
    slug: 'packaging-materials',
    title: 'Packaging Materials',
    description: 'Industrial strapping systems, tools, stretch films, and adhesive tapes.',
    image: '/assets/docx/image29.jpeg',
    productIds: ['pk1', 'pk2', 'pk3', 'pk4']
  }
];
