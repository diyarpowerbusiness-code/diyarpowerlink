import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../components/UI';
import { COMPANY_NAME } from '../constants';
import { Target, Eye, Heart, Shield, Users } from 'lucide-react';
import { API_BASE } from '../api';
import { resolveImageUrl } from '../utils/media';

export const About = () => {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => data && Object.keys(data).length > 0 && setSettings(data))
      .catch(() => null);
  }, []);

  const about = settings.about || {};

  const defaultOverviewText = [
    `Diyar Power Link LLP is a registered limited liability partnership focused on General Trading, supply of consumables, and IT consultancy.`,
    `The primary focus of Diyar is the General Trading supply of Consumables and IT consultancy and support of computer hardware and software, web design and program applications and services.`,
    `Our team's experience together with long-standing manufacturer relationships makes us the ideal partner for businesses across all sectors — from retail and healthcare to logistics and enterprise IT.`
  ].join('\n\n');

  const overviewText = (about.overviewText || about.whoText || defaultOverviewText)
    .split('\n\n')
    .map((p: string) => p.trim())
    .filter(Boolean);

  const leadership = Array.isArray(about.leadership) && about.leadership.length > 0
    ? about.leadership
    : [
        { name: 'Shaik Mohammed Aliuddin', role: 'Managing Director' },
        { name: 'Mohd Rahmath', role: 'Partner' }
      ];

  const values = Array.isArray(about.values) && about.values.length > 0
    ? about.values
    : [
        { title: 'Quality First', description: 'We never compromise on the quality of our products and services.' },
        { title: 'Customer Focus', description: 'Our clients are at the heart of everything we do.' },
        { title: 'Innovation', description: 'We constantly evolve to bring you the latest technology solutions.' },
        { title: 'Integrity', description: 'We build trust through honest and transparent business practices.' }
      ];

  const strengths = Array.isArray(about.strengths) && about.strengths.length > 0
    ? about.strengths
    : [
        { title: 'Multi-Vertical Trading', description: 'IT, paper, medical, and packaging sectors.' },
        { title: 'Manufacturer Partnerships', description: 'Strong relationships with trusted suppliers.' },
        { title: 'Reliable Supply', description: 'Competitive pricing with dependable delivery.' },
        { title: 'Customer Focus', description: 'Solutions designed around client needs.' }
      ];

  const visionText =
    about.visionText ||
    'To evolve into a most sought-after business partner in providing latest state-of-the-art technology products and business solutions empowering organizations to face global challenges and exploit the business potential.';
  const missionText =
    about.missionText ||
    'To provide "mission critical product and solutions" that exactly meets the needs of our clients resulting in meeting the needs of all our stakeholders.';
  const philosophyText =
    about.philosophyText ||
    'We deliver the best in everything from IT to customer services. This, coupled with a global perspective, passion to innovate and burning desire to retain and satisfy all our clients makes Diyar the first choice.';

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={resolveImageUrl(about.heroImage) || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80'}
            alt="Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6">
            {about.heroTitle || 'About Our Company'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl">
            {about.heroSubtitle || 'A trusted trading and technology solutions provider empowering organizations to face global challenges.'}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader title={about.whoTitle || 'Who We Are'} centered={false} />
              <div className="space-y-5 text-slate-600 leading-relaxed">
                {overviewText.map((text: string, idx: number) => (
                  <p key={idx}>
                    {idx === 0 ? (
                      <>
                        <strong className="text-primary">{COMPANY_NAME}</strong> {text.replace(`${COMPANY_NAME} `, '')}
                      </>
                    ) : (
                      text
                    )}
                  </p>
                ))}
              </div>

                <div className="mt-10 grid grid-cols-2 gap-4">
                 {strengths.map((item: any, i: number) => (
                   <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="font-bold text-primary text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={resolveImageUrl(about.image) || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80'}
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
            title={about.overviewTitle || 'Our Vision, Mission & Philosophy'}
            subtitle={about.overviewTitle ? '' : 'The principles that define how we do business and serve our clients.'}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Eye, title: 'Our Vision', desc: visionText },
              { icon: Target, title: 'Our Mission', desc: missionText },
              { icon: Heart, title: 'Our Philosophy', desc: philosophyText }
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
            {leadership.map((person: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 bg-slate-50 rounded-3xl p-10 text-center border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                  <Users size={36} className="text-white" />
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
            {values.map((value: any, i: number) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  {(i === 0 && <Shield size={24} />) ||
                    (i === 1 && <Heart size={24} />) ||
                    (i === 2 && <Target size={24} />) ||
                    <Eye size={24} />}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description || value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
