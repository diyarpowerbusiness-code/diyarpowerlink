import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Clock, Award } from 'lucide-react';
import * as Icons from 'lucide-react';
import { CatalogProductCard, SectionHeader, ServiceCard } from '../components/UI';
import { PARTNERS } from '../constants';
import { Link } from 'react-router-dom';
import { API_BASE } from '../api';
import { getCategoryFallbackImage, resolveImageUrl } from '../utils/media';

export const Home = () => {
  const customerNames = [
    'Ratnadeep Retail Private Limited',
    'K. S Private Limited',
    'Redrose Mart Pvt Ltd',
    'Vijetha Super Market',
    'Spar Hypermarket',
    'National Mart',
    'DMart',
    'More Supermarket',
    'Reliance Smart Superstore',
    'Hashmi Brothers',
    'Alis Mart Enterprises',
    'Everyday Supermarket',
    'Sonam Stores',
    'Gayathri Stores',
    'Maha Collections',
    'AARADHYA MART',
    'SHREE AARADHYA MART',
    'REHAN MART',
    'USHODAYA MART',
    'Sri Lakshmi Collections',
    'Mangalaya Stores',
    'Karli Brothers',
    'Ambica Stores',
    'Raghavendra Super Market',
    'Venkateshwara Mart',
    'Shashi Supermarket',
    'Garuda Vastra Collection',
    'Modern Cake Bank',
    'Indian Bakery',
    'Santosh Bakery and Store',
    'Mangalaya Collections',
    'Shree Collections',
    'Apollo Hospitals',
    'Yashoda Hospitals',
    'Care Hospitals',
    'Kamineni Hospital',
    'SVS Hospital',
    'Private Companies',
    'Industrial Sector'
  ];

  const customerGroups = React.useMemo(() => {
    const groups = [
      { title: 'Retail & Supermarkets', items: [] as string[] },
      { title: 'Healthcare', items: [] as string[] },
      { title: 'Food & Bakery', items: [] as string[] },
      { title: 'General Business', items: [] as string[] }
    ];

    const getGroupIndex = (name: string) => {
      const normalized = name.toLowerCase();
      if (normalized.includes('hospital') || normalized.includes('care') || normalized.includes('kamineni')) return 1;
      if (normalized.includes('bakery') || normalized.includes('cake')) return 2;
      if (
        normalized.includes('mart') ||
        normalized.includes('market') ||
        normalized.includes('supermarket') ||
        normalized.includes('stores') ||
        normalized.includes('mart') ||
        normalized.includes('reliance smart') ||
        normalized.includes('retail')
      ) return 0;
      return 3;
    };

    customerNames.forEach((name) => {
      groups[getGroupIndex(name)].items.push(name);
    });

    return groups.filter((group) => group.items.length > 0);
  }, []);
  const featuredCustomers = customerNames.slice(0, 8);

  const defaultServices = [
    { title: 'IT Consultancy', description: 'Strategic guidance to align technology with business objectives.', icon: 'Lightbulb' },
    { title: 'Hardware Installation', description: 'Professional setup for desktops, servers, and peripherals.', icon: 'Wrench' },
    { title: 'Network Solutions', description: 'LAN, fiber, routing, and secure network infrastructure.', icon: 'Network' },
    { title: 'Technical Support', description: 'Responsive onsite and remote support to minimize downtime.', icon: 'Headphones' }
  ];
  const defaultBusinessAreas = [
    {
      title: 'IT Solutions',
      description: 'Hardware, software, and networking solutions for enterprises.',
      image: '/assets/docx/it solution.png',
      link: '/products/category/it-solutions'
    },
    {
      title: 'Paper Products',
      description: 'Thermal rolls, labels, and carbonless paper solutions.',
      image: '/assets/docx/paper products.png',
      link: '/products/category/paper-products'
    },
    {
      title: 'Medical Supplies',
      description: 'Patient wristbands, PPE clothing, and hospital consumables.',
      image: '/assets/docx/medical.png',
      link: '/products/category/medical-supplies'
    },
    {
      title: 'Packaging Materials',
      description: 'Strapping, stretch film, tools, and adhesive tapes.',
      image: '/assets/docx/image29.jpeg',
      link: '/products/category/packaging-materials'
    }
  ];

  const [services, setServices] = useState<any[]>(defaultServices);
  const [products, setProducts] = useState<any[]>([]);
  const [businessAreas, setBusinessAreas] = useState<any[]>(defaultBusinessAreas);
  const [partners, setPartners] = useState<any[]>(PARTNERS);
  const [settings, setSettings] = useState<any>({});
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const partnerFallbackMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    PARTNERS.forEach((p) => {
      map[p.name.toLowerCase()] = p.logo;
    });
    return map;
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const featured = data.filter((s) => s.featured);
          setServices(featured.length > 0 ? featured : data);
        }
      })
      .catch(() => null);
    fetch(`${API_BASE}/api/business-areas`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setBusinessAreas(data))
      .catch(() => null);
    fetch(`${API_BASE}/api/partners`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setPartners(data))
      .catch(() => null);
    fetch(`${API_BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => data && Object.keys(data).length > 0 && setSettings(data))
      .catch(() => null);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center pt-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40 z-10" />
          <img
            src={resolveImageUrl(settings.home?.heroBackgroundImage) || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'}
            alt="IT Solutions"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20">
          <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-semibold mb-6">
                {settings.websiteName || 'Diyar Power Link LLP'}
              </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-4">
              {settings.heroTitle
                ? settings.heroTitle.split('\n').map((line: string, idx: number) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))
                : (
                  <>
                    One Shop for<br /><span className="text-blue-500">All IT Needs</span>
                  </>
                )}
            </h1>
            <p className="text-lg sm:text-xl text-blue-200 font-semibold mb-4">
              {settings.heroSubtitle || 'Your Trusted Technology Partner'}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              {settings.heroDescription || 'Diyar Power Link LLP is a multi-vertical trading and technology solutions provider delivering reliable supply, competitive pricing, and professional support across industries.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
              <Link
                to={settings.home?.heroPrimaryLink || '/products'}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 group"
              >
                {settings.home?.heroPrimaryLabel || 'View Products'}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to={settings.home?.heroSecondaryLink || '/contact'}
                className="bg-white/5 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm"
              >
                {settings.home?.heroSecondaryLabel || 'Contact Us'}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(settings.home?.heroBadges?.length
                ? settings.home.heroBadges
                : [
                    { title: 'On-time Delivery', description: 'Truck' },
                    { title: 'Genuine Warranties', description: 'ShieldCheck' },
                    { title: 'Trusted Brands', description: 'Award' }
                  ]
              ).map((item: any, i: number) => {
                const Icon = (Icons as any)[item.description] || Truck;
                return (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Business Categories Strip */}
      <section className="py-6 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-white text-sm font-medium">
            {(settings.home?.businessStripItems?.length
              ? settings.home.businessStripItems
              : ['Trading Business B2B & B2C', 'Import & Export', 'Distribution & Supply', 'Wholesale & Retail', 'Services & Support Maintenance']
            ).map((item: string, i: number) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={resolveImageUrl(settings.home?.whoImage) || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80'}
                  alt="Our Office"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-1">{settings.home?.whoStatValue || '10+'}</p>
                <p className="text-sm font-medium opacity-90">
                  {(settings.home?.whoStatLabel || 'Years of Industry\nExperience').split('\n').map((line: string, idx: number) => (
                    <span key={idx} className="block">{line}</span>
                  ))}
                </p>
              </div>
            </div>

            <div>
              <SectionHeader
                title={settings.home?.whoTitle || 'Who We Are'}
                subtitle={settings.home?.whoSubtitle || 'The primary focus of Diyar is General Trading, supply of Consumables and IT consultancy.'}
                centered={false}
              />
              <p className="text-slate-600 mb-6 leading-relaxed">
                {settings.home?.whoDescription || 'Our primary focus is the General Trading supply of Consumables and IT consultancy and support of computer hardware and software, web design, program applications and services. Our team\'s experience together with long-standing manufacturer relationships makes us the ideal partner.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {(settings.home?.whoBullets?.length
                  ? settings.home.whoBullets
                  : [
                      'IT Hardware & Software',
                      'Thermal Paper Products',
                      'Medical Supplies',
                      'Packaging Solutions',
                      'Import & Export',
                      'IT Consultancy'
                    ]
                ).map((item: string, i: number) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0" size={18} />
                    <span className="font-medium text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to={settings.home?.whoCtaLink || '/about'} className="text-blue-600 font-semibold flex items-center hover:underline">
                {settings.home?.whoCtaLabel || 'Learn more about us'}
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-20 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={settings.home?.businessAreasTitle || 'Business Areas'}
            subtitle={settings.home?.businessAreasSubtitle || 'Focused expertise across our core B2B sectors.'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {businessAreas.map((sector, i) => {
              const fallback = getCategoryFallbackImage(sector.title);
              const imgSrc = resolveImageUrl(sector.image || fallback);
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-white">
                    <img
                      src={imgSrc}
                      alt={sector.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = fallback;
                      }}
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-3">{sector.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{sector.description || sector.desc}</p>
                    <Link to={sector.link} className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all">
                      {settings.home?.businessAreasCtaLabel || 'View Products'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Services Overview */}
      <section className="py-20 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={settings.home?.servicesTitle || 'Services'}
            subtitle={settings.home?.servicesSubtitle || 'Professional support designed for enterprise reliability.'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {services.map((service) => (
              <ServiceCard key={service._id || service.title} service={service as any} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
              {settings.home?.servicesCtaLabel || 'View All Services'} <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={settings.home?.whyTitle || 'Why Choose Us'}
            subtitle={settings.home?.whySubtitle || 'Consistent quality and delivery backed by technical expertise.'}
            light={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(settings.home?.whyItems?.length
              ? settings.home.whyItems.map((item: any, idx: number) => ({
                  icon: [Award, Truck, ShieldCheck, Clock][idx % 4],
                  title: item.title,
                  desc: item.description || item.desc
                }))
              : [
                  { icon: Award, title: 'Quality Products', desc: 'Sourced from trusted manufacturers with genuine warranties.' },
                  { icon: Truck, title: 'Reliable Supply', desc: 'On-time delivery supported by proven logistics.' },
                  { icon: ShieldCheck, title: 'Competitive Pricing', desc: 'Cost-effective solutions across product categories.' },
                  { icon: Clock, title: 'Technical Expertise', desc: 'Experienced team for installation, support, and guidance.' }
                ]
            ).map((item: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-blue-400" size={22} />
                </div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={settings.home?.partnersTitle || 'Our Technology Partners'}
            subtitle={settings.home?.partnersSubtitle || 'We are proud to partner with world-renowned technology brands to deliver the best solutions to our clients.'}
          />
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-white border border-slate-100 rounded-2xl h-24 flex items-center justify-center shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <img
                    src={resolveImageUrl(partner.logo || partnerFallbackMap[partner.name.toLowerCase()])}
                    alt={partner.name}
                    className={`object-contain grayscale group-hover:grayscale-0 transition-all ${partner.name === 'Autodesk' ? 'h-16 w-40' : 'h-10 w-28'}`}
                    onError={(e) => {
                      const fallback = partnerFallbackMap[partner.name.toLowerCase()] || '/assets/partners/diyar-logo.jpg';
                      (e.currentTarget as HTMLImageElement).src = resolveImageUrl(fallback);
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customers */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              title="Our Customers"
              subtitle="Trusted by a wide range of retail, healthcare, food, and business clients."
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-6 py-5">
                <p className="text-3xl font-bold text-blue-700">{customerNames.length}+</p>
                <p className="text-sm text-slate-600 mt-1">Customers served</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-6 py-5">
                <p className="text-3xl font-bold text-blue-700">{customerGroups.length}</p>
                <p className="text-sm text-slate-600 mt-1">Business groups</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm px-6 py-5">
                <p className="text-3xl font-bold text-blue-700">24/7</p>
                <p className="text-sm text-slate-600 mt-1">Support approach</p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Featured Customers</h3>
                <p className="text-sm text-slate-500">A quick snapshot of a few customer names.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllCustomers((value) => !value)}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                {showAllCustomers ? 'Hide full list' : 'View all customers'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {featuredCustomers.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {showAllCustomers && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {customerGroups.map((group) => (
                <div key={group.title} className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{group.title}</h3>
                      <p className="text-sm text-slate-500">{group.items.length} customers</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-700">
                      Trusted
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
