import { Product, Service, Partner } from './types';

export const COMPANY_NAME = "Diyar Power Link LLP";

export const PRODUCTS: Product[] = [
  // IT Solutions
  {
    id: 'it-pos',
    name: 'POS Printers',
    category: 'IT Solutions',
    description: 'Professional POS printers from leading brands for retail and hospitality environments.',
    image: '/assets/docx/image9.png',
    features: ['Thermal Receipt Printing', 'Fast & Reliable', 'Retail & Hospitality', 'Service Support']
  },
  {
    id: 'it-desktops',
    name: 'Desktops',
    category: 'IT Solutions',
    description: 'Business and personal computing solutions built for performance and reliability.',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80',
    features: ['Business Desktops', 'All-in-One Options', 'Warranty Support', 'Enterprise Ready']
  },
  {
    id: 'it-laptops',
    name: 'Laptops',
    category: 'IT Solutions',
    description: 'Portable computing solutions for professionals and enterprises.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    features: ['Portable Performance', 'Business Series', 'Reliable Battery', 'Support & Warranty']
  },
  {
    id: 'it-monitors',
    name: 'Monitors',
    category: 'IT Solutions',
    description: 'Display solutions for office, enterprise, and presentation needs.',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80',
    features: ['HD & 4K Options', 'Professional Displays', 'Ergonomic Stands', 'Multiple Sizes']
  },
  {
    id: 'it-projectors',
    name: 'Projectors',
    category: 'IT Solutions',
    description: 'Presentation equipment for conference rooms, training, and events.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
    features: ['High Brightness', 'HD Projection', 'Meeting Rooms', 'Installation Support']
  },
  {
    id: 'it-ups',
    name: 'UPS Systems',
    category: 'IT Solutions',
    description: 'Power backup solutions to protect critical IT infrastructure.',
    image: 'https://images.unsplash.com/photo-1581091215367-59ab6d76e414?auto=format&fit=crop&q=80',
    features: ['Power Backup', 'Surge Protection', 'Office & Server Use', 'Reliable Runtime']
  },
  {
    id: 'it-software',
    name: 'Software Products',
    category: 'IT Solutions',
    description: 'Productivity, design, and security software for enterprise operations.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    features: ['Productivity Suites', 'Design Tools', 'Security Solutions', 'Genuine Licenses']
  },

  // Paper Products
  {
    id: 'pp-thermal-rolls',
    name: 'Thermal Paper Rolls',
    category: 'Paper Products',
    description: 'Premium thermal paper rolls for POS, ATM, ECG, and ticket printing.',
    image: '/assets/docx/image1.png',
    features: ['80 & 57 Series', 'BPA-Free', 'Fast Response', 'High Durability']
  },
  {
    id: 'pp-atm',
    name: 'ATM Paper',
    category: 'Paper Products',
    description: 'High-quality ATM rolls for clear and reliable transaction printing.',
    image: '/assets/docx/image2.png',
    features: ['Clear Prints', 'Durable Coating', 'Standard Sizes', 'Bulk Supply']
  },
  {
    id: 'pp-ecg',
    name: 'ECG Paper',
    category: 'Paper Products',
    description: 'Medical-grade ECG paper for accurate diagnostic recording.',
    image: '/assets/docx/image5.png',
    features: ['Medical Grade', 'Accurate Output', 'Consistent Grid', 'Reliable Supply']
  },
  {
    id: 'pp-cinema',
    name: 'Cinema Ticket Paper',
    category: 'Paper Products',
    description: 'Thermal ticket paper for cinemas, events, and venues.',
    image: '/assets/docx/image2.png',
    features: ['Sharp Print', 'Fast Processing', 'Durable Finish', 'Custom Sizes']
  },
  {
    id: 'pp-jumbo',
    name: 'Jumbo Rolls',
    category: 'Paper Products',
    description: 'Large-format jumbo rolls for high-volume printing environments.',
    image: '/assets/docx/image1.png',
    features: ['High Volume', 'Consistent Quality', 'Cost Efficient', 'Custom Orders']
  },
  {
    id: 'pp-carbonless',
    name: 'Carbonless Paper',
    category: 'Paper Products',
    description: 'Carbonless copy paper for invoices, receipts, and multi-part forms.',
    image: '/assets/docx/image4.png',
    features: ['2-3 Ply Options', 'Multiple Colors', 'Logo Printing', 'Clean & Efficient']
  },

  // Thermal Labels (sub-category)
  {
    id: 'tl-shipping',
    name: 'Shipping Labels',
    category: 'Thermal Labels',
    description: 'Durable shipping labels for logistics and warehousing.',
    image: '/assets/docx/image3.png',
    features: ['Strong Adhesive', 'Smudge Resistant', 'Barcode Ready', 'Various Sizes']
  },
  {
    id: 'tl-a4',
    name: 'A4 Labels',
    category: 'Thermal Labels',
    description: 'A4 sheet labels for office and warehouse labeling.',
    image: '/assets/docx/image3.png',
    features: ['Easy Printing', 'Standard A4', 'Multiple Layouts', 'Clean Finish']
  },
  {
    id: 'tl-linerless',
    name: 'Linerless Labels',
    category: 'Thermal Labels',
    description: 'Eco-friendly linerless labels for efficient labeling.',
    image: '/assets/docx/image3.png',
    features: ['Less Waste', 'High Adhesion', 'Cost Efficient', 'Retail Ready']
  },
  {
    id: 'tl-dymo',
    name: 'Dymo Labels',
    category: 'Thermal Labels',
    description: 'Dymo compatible labels for office and retail needs.',
    image: '/assets/docx/image3.png',
    features: ['Dymo Compatible', 'Clear Print', 'Multiple Sizes', 'Easy Use']
  },
  {
    id: 'tl-package',
    name: 'Package Labels',
    category: 'Thermal Labels',
    description: 'Package labels for shipping, inventory, and tracking.',
    image: '/assets/docx/image3.png',
    features: ['Tracking Ready', 'Strong Adhesive', 'Barcode Support', 'Durable']
  },
  {
    id: 'tl-custom',
    name: 'Custom Labels',
    category: 'Thermal Labels',
    description: 'Custom label sizes, shapes, and branding options.',
    image: '/assets/docx/image3.png',
    features: ['Custom Sizes', 'Branding Options', 'Professional Finish', 'Bulk Orders']
  },

  // Medical Supplies
  {
    id: 'med-patient',
    name: 'Patient Wristbands',
    category: 'Medical Supplies',
    description: 'Comfortable, durable wristbands for patient identification.',
    image: '/assets/docx/image12.jpeg',
    features: ['Waterproof', 'Comfort Fit', 'Clear Printing', 'Secure Closure']
  },
  {
    id: 'med-rfid',
    name: 'RFID Wristbands',
    category: 'Medical Supplies',
    description: 'RFID-enabled wristbands for accurate patient tracking.',
    image: '/assets/docx/image13.jpeg',
    features: ['RFID Enabled', 'Tamper Resistant', 'Accurate ID', 'Healthcare Ready']
  },
  {
    id: 'med-ppe',
    name: 'PPE Clothing',
    category: 'Medical Supplies',
    description: 'Protective clothing including coveralls, gowns, and aprons.',
    image: '/assets/docx/image15.jpeg',
    features: ['CAT III Options', 'Disposable', 'Multiple Sizes', 'Medical Grade']
  },
  {
    id: 'med-labcoats',
    name: 'Lab Coats',
    category: 'Medical Supplies',
    description: 'Disposable lab coats for clinical and laboratory use.',
    image: '/assets/docx/image22.jpeg',
    features: ['Unisex Fit', 'Disposable', 'Comfortable Wear', 'Clinic Ready']
  },
  {
    id: 'med-blood',
    name: 'Blood Collection Tubes',
    category: 'Medical Supplies',
    description: 'Vacuum blood collection tubes for safe sample handling.',
    image: '/assets/docx/image23.png',
    features: ['Multiple Sizes', 'Sterile', 'Reliable Seals', 'Medical Grade']
  },
  {
    id: 'med-swabs',
    name: 'Cotton Swabs',
    category: 'Medical Supplies',
    description: 'Sterile cotton swabs for clinical and lab use.',
    image: '/assets/docx/image23.png',
    features: ['Sterile', 'Disposable', 'Clinical Use', 'Reliable Quality']
  },
  {
    id: 'med-pcr',
    name: 'PCR Tubes',
    category: 'Medical Supplies',
    description: 'PCR tubes and strips for laboratory diagnostics.',
    image: '/assets/docx/image23.png',
    features: ['Lab Grade', 'Multiple Sizes', 'Accurate Testing', 'Consistent Quality']
  },
  {
    id: 'med-consumables',
    name: 'Hospital Consumables',
    category: 'Medical Supplies',
    description: 'Essential disposables for clinical and hospital operations.',
    image: '/assets/docx/image23.png',
    features: ['Daily Use', 'Sterile Options', 'Bulk Supply', 'Reliable Delivery']
  },

  // Packaging Materials
  {
    id: 'pack-polyester',
    name: 'Polyester Strapping',
    category: 'Packaging Materials',
    description: 'High-strength composite strapping for secure cargo handling.',
    image: '/assets/docx/image27.jpeg',
    features: ['Strong as Steel', 'Shock Absorbent', 'Weather Resistant', 'Certified Quality']
  },
  {
    id: 'pack-pet',
    name: 'PET Strapping',
    category: 'Packaging Materials',
    description: 'PET strapping solutions for heavy-duty packaging needs.',
    image: '/assets/docx/image26.jpeg',
    features: ['High Tension', 'Consistent Strength', 'Industrial Use', 'Cost Effective']
  },
  {
    id: 'pack-steel',
    name: 'Steel Strapping',
    category: 'Packaging Materials',
    description: 'Steel strapping for robust industrial packaging applications.',
    image: '/assets/docx/image28.jpeg',
    features: ['High Tensile', 'Heavy Duty', 'Industrial Grade', 'Secure Loads']
  },
  {
    id: 'pack-tools',
    name: 'Strapping Tools',
    category: 'Packaging Materials',
    description: 'Battery, pneumatic, and manual tools for efficient strapping.',
    image: '/assets/docx/image29.jpeg',
    features: ['Battery & Pneumatic', 'High Tension', 'Ergonomic', 'Reliable Performance']
  },
  {
    id: 'pack-stretch',
    name: 'Stretch Film Rolls',
    category: 'Packaging Materials',
    description: 'Stretch film for pallet wrapping and transit protection.',
    image: '/assets/docx/image40.jpeg',
    features: ['Tear Resistant', 'Clear Film', 'Hand & Machine', 'Secure Packaging']
  },
  {
    id: 'pack-tapes',
    name: 'Adhesive Tapes',
    category: 'Packaging Materials',
    description: 'BOPP, masking, aluminum, and duct tapes for packaging.',
    image: '/assets/docx/image41.png',
    features: ['Multiple Types', 'Strong Adhesion', 'Clear & Brown', 'Industrial Use']
  }
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
    description: 'We guarantee our deliveries on the back of our proven track record. Dispatching, logistics and delivery ? all part of our standard practice.',
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
  { name: 'Microsoft', logo: '/assets/partners/microsoft.svg', url: 'https://www.microsoft.com' },
  { name: 'Adobe', logo: '/assets/partners/adobe.jpg', url: 'https://www.adobe.com' },
  { name: 'Autodesk', logo: '/assets/partners/autodesk-4-logo.png', url: 'https://www.autodesk.com' },
  { name: 'Kaspersky', logo: '/assets/partners/kaspersky.png', url: 'https://www.kaspersky.com' },
  { name: 'ESET', logo: '/assets/partners/ESET_logo.svg.png', url: 'https://www.eset.com' },
  { name: 'Norton', logo: '/assets/partners/2-1zhoymd-jriZE9wDW_ubvDFnlRSodhncmy4wj92QuDRv_MbsXfSL1xjszV68U4D46Oxtd_GLI6tFLW7v_vHfHXO_-0pKhJfBVm8GLxe7dcu0B4AodhaK6TzLpjrnBA57FHCE8fUAwKYyJQf4adRA.png', url: 'https://www.norton.com' }
];

export const PRODUCT_CATEGORIES = [
  {
    slug: 'it-solutions',
    title: 'IT Solutions',
    description: 'POS printers, desktops, laptops, monitors, projectors, UPS systems, and software products.',
    image: '/assets/docx/it solution.png',
    productIds: ['it-pos', 'it-desktops', 'it-laptops', 'it-monitors', 'it-projectors', 'it-ups', 'it-software']
  },
  {
    slug: 'paper-products',
    title: 'Paper Products',
    description: 'Thermal paper rolls, ATM paper, ECG paper, cinema ticket paper, jumbo rolls, and carbonless paper.',
    image: '/assets/docx/paper products.png',
    productIds: ['pp-thermal-rolls', 'pp-atm', 'pp-ecg', 'pp-cinema', 'pp-jumbo', 'pp-carbonless']
  },
  {
    slug: 'thermal-labels',
    title: 'Thermal Labels',
    description: 'Shipping, A4, linerless, Dymo, package, and custom thermal labels.',
    image: '/assets/docx/thermal labels.png',
    productIds: ['tl-shipping', 'tl-a4', 'tl-linerless', 'tl-dymo', 'tl-package', 'tl-custom']
  },
  {
    slug: 'medical-supplies',
    title: 'Medical Supplies',
    description: 'Patient wristbands, RFID wristbands, PPE clothing, lab coats, blood collection tubes, cotton swabs, PCR tubes, and hospital consumables.',
    image: '/assets/docx/medical.png',
    productIds: ['med-patient', 'med-rfid', 'med-ppe', 'med-labcoats', 'med-blood', 'med-swabs', 'med-pcr', 'med-consumables']
  },
  {
    slug: 'packaging-materials',
    title: 'Packaging Materials',
    description: 'Polyester, PET, and steel strapping, strapping tools, stretch film rolls, and adhesive tapes.',
    image: '/assets/docx/image29.jpeg',
    productIds: ['pack-polyester', 'pack-pet', 'pack-steel', 'pack-tools', 'pack-stretch', 'pack-tapes']
  }
];
