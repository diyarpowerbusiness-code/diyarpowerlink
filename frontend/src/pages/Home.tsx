import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Clock, Award } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SectionHeader, ServiceCard } from '../components/UI';
import { PARTNERS } from '../constants';
import { Link } from 'react-router-dom';

export const Home = () => {
  const featuredServices = [
    { title: 'IT Consultancy', description: 'Strategic guidance to align technology with business objectives.', icon: 'Lightbulb' },
    { title: 'Hardware Installation', description: 'Professional setup for desktops, servers, and peripherals.', icon: 'Wrench' },
    { title: 'Network Solutions', description: 'LAN, fiber, routing, and secure network infrastructure.', icon: 'Network' },
    { title: 'Technical Support', description: 'Responsive onsite and remote support to minimize downtime.', icon: 'Headphones' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center pt-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
            alt="IT Solutions"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20">
          <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-semibold mb-6">
                Diyar Power Link LLP
              </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-4">
              One Shop for<br /><span className="text-blue-500">All IT Needs</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-200 font-semibold mb-4">
              Your Trusted Technology Partner
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Diyar Power Link LLP is a multi-vertical trading and technology solutions provider delivering
              reliable supply, competitive pricing, and professional support across industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
              <Link to="/products" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 group">
                View Products
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
                <Link to="/contact" className="bg-white/5 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm">
                  Contact Us
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'On‑time Delivery', icon: Truck },
                  { label: 'Genuine Warranties', icon: ShieldCheck },
                  { label: 'Trusted Brands', icon: Award }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* Business Categories Strip */}
      <section className="py-6 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-white text-sm font-medium">
            {['Trading Business B2B & B2C', 'Import & Export', 'Distribution & Supply', 'Wholesale & Retail', 'Services & Support Maintenance'].map((item, i) => (
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
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                  alt="Our Office"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-1">10+</p>
                <p className="text-sm font-medium opacity-90">Years of Industry<br />Experience</p>
              </div>
            </div>

            <div>
              <SectionHeader
                title="Who We Are"
                subtitle="The primary focus of Diyar is General Trading, supply of Consumables and IT consultancy."
                centered={false}
              />
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our primary focus is the General Trading supply of Consumables and IT consultancy and support of computer hardware and software, web design, program applications and services. Our team's experience together with long-standing manufacturer relationships makes us the ideal partner.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'IT Hardware & Software',
                  'Thermal Paper Products',
                  'Medical Supplies',
                  'Packaging Solutions',
                  'Import & Export',
                  'IT Consultancy'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0" size={18} />
                    <span className="font-medium text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="text-blue-600 font-semibold flex items-center hover:underline">
                Learn more about us
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
            title="Business Areas"
            subtitle="Focused expertise across our core B2B sectors."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {[
              {
                title: 'IT Solutions',
                desc: 'Hardware, software, and networking solutions for enterprises.',
                image: '/assets/docx/it solution.png',
                link: '/products/category/it-solutions'
              },
              {
                title: 'Paper Products',
                desc: 'Thermal rolls, labels, and carbonless paper solutions.',
                image: '/assets/docx/paper products.png',
                link: '/products/category/paper-products'
              },
              {
                title: 'Medical Supplies',
                desc: 'Patient wristbands, PPE clothing, and hospital consumables.',
                image: '/assets/docx/medical.png',
                link: '/products/category/medical-supplies'
              },
              {
                title: 'Packaging Materials',
                desc: 'Strapping, stretch film, tools, and adhesive tapes.',
                image: '/assets/docx/image29.jpeg',
                link: '/products/category/packaging-materials'
              }
            ].map((sector, i) => {
              return (
                <div key={i} className="rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-white">
                    <img src={sector.image} alt={sector.title} className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-3">{sector.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{sector.desc}</p>
                    <Link to={sector.link} className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all">
                      View Products
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
            title="Services"
            subtitle="Professional support designed for enterprise reliability."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.title} service={service as any} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
              View All Services <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Us"
            subtitle="Consistent quality and delivery backed by technical expertise."
            light={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Quality Products', desc: 'Sourced from trusted manufacturers with genuine warranties.' },
              { icon: Truck, title: 'Reliable Supply', desc: 'On-time delivery supported by proven logistics.' },
              { icon: ShieldCheck, title: 'Competitive Pricing', desc: 'Cost-effective solutions across product categories.' },
              { icon: Clock, title: 'Technical Expertise', desc: 'Experienced team for installation, support, and guidance.' }
            ].map((item, i) => (
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
            title="Our Technology Partners"
            subtitle="We are proud to partner with world-renowned technology brands to deliver the best solutions to our clients."
          />
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
              {PARTNERS.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-white border border-slate-100 rounded-2xl h-24 flex items-center justify-center shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`object-contain grayscale group-hover:grayscale-0 transition-all ${partner.name === 'Autodesk' ? 'h-16 w-40' : 'h-10 w-28'}`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
