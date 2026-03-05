import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/UI';
import { COMPANY_NAME } from '../constants';
import { Target, Eye, Heart, Shield, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6">About Our Company</h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl">
            A trusted trading and technology solutions provider empowering organizations to face global challenges.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader title="Who We Are" centered={false} />
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-primary">Diyar Power Link LLP</strong> is a registered limited liability partnership focused on General Trading, supply of consumables, and IT consultancy.
                </p>
                <p>
                  The primary focus of Diyar is the General Trading supply of Consumables and IT consultancy and support of computer hardware and Software, Web design and program Applications and services.
                </p>
                <p>
                  Our team's experience together with long-standing manufacturer relationships makes us the ideal partner for businesses across all sectors — from retail and healthcare to logistics and enterprise IT.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { label: 'Trading Business', sub: 'B2B & B2C' },
                  { label: 'Import & Export', sub: 'Global Trade' },
                  { label: 'Distribution & Supply', sub: 'Wholesale & Retail' },
                  { label: 'Services & Support', sub: 'Maintenance' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-primary text-sm">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                alt="Our Office"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Philosophy */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Vision, Mission & Philosophy"
            subtitle="The principles that define how we do business and serve our clients."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'To evolve into a most sought-after business partner in providing latest state-of-the-art technology products and business solutions empowering organizations to face global challenges and exploit the business potential.'
              },
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To provide "mission critical product and solutions" that exactly meets the needs of our clients resulting in meeting the needs of all our stakeholders.'
              },
              {
                icon: Heart,
                title: 'Our Philosophy',
                desc: 'We deliver the best in everything from IT to customer services. This, coupled with a global perspective, passion to innovate and burning desire to retain and satisfy all our clients makes Diyar the first choice.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-8">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Leadership Team"
            subtitle="The experienced professionals guiding Diyar Power Link LLP."
          />
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-2xl mx-auto">
            {[
              { name: 'Shaik Mohammed Aliuddin', role: 'Managing Director', icon: Users },
              { name: 'Mohd Rahmath', role: 'Partner', icon: Users },
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 bg-slate-50 rounded-3xl p-10 text-center border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                  <person.icon size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-2">{person.name}</h3>
                <p className="text-blue-600 font-semibold text-sm">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles that guide our business and define our commitment to excellence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Quality First', desc: 'We never compromise on the quality of our products and services.', icon: Shield },
              { title: 'Customer Focus', desc: 'Our clients are at the heart of everything we do.', icon: Heart },
              { title: 'Innovation', desc: 'We constantly evolve to bring you the latest technology solutions.', icon: Target },
              { title: 'Integrity', desc: 'We build trust through honest and transparent business practices.', icon: Eye }
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
