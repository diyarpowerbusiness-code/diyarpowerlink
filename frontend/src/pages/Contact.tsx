import React from 'react';
import { SectionHeader } from '../components/UI';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6">Get in Touch</h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            We appreciate your time and attention. Reach out to us for all your IT needs.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Quick answers to common inquiries about our products and services."
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: 'Do you provide onsite technical support?', a: 'Yes, we provide both onsite and remote technical support for all hardware and software solutions we supply.' },
              { q: 'Can I get customized thermal rolls with my logo?', a: 'Absolutely! We specialize in custom-printed thermal rolls for branding and promotional purposes.' },
              { q: 'What is the standard delivery time?', a: 'Delivery times vary by location, but we typically fulfill orders within 2-5 business days across India.' },
              { q: 'Are your paper products BPA-free?', a: 'Yes, all our thermal paper products are BPA-free and meet international safety and quality standards.' }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-primary mb-2 flex items-center">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] mr-3 flex-shrink-0">Q</span>
                  {faq.q}
                </h4>
                <p className="text-slate-600 text-sm pl-9 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-2xl font-display font-bold text-primary mb-8">Get in Touch</h3>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Our Address</h4>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Building%2010-6-87%2F2%2C%20Street%20Rural%20Police%20Station%2C%20Srinivasa%20Colony%2C%20Mahabubnagar%20509001%2C%20Telangana%2C%20India"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 text-sm leading-relaxed hover:text-blue-600 transition-colors"
                      >
                        Building 10-6-87/2, Street Rural Police Station, Srinivasa Colony, Mahabubnagar – 509001, Telangana, India
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Phone Number</h4>
                      <a href="tel:+918688050498" className="text-slate-600 text-sm hover:text-blue-600 transition-colors">
                        +91 8688050498
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Email Address</h4>
                      <a href="mailto:info@diyarpowerlink.com" className="text-slate-600 text-sm hover:text-blue-600 transition-colors">
                        info@diyarpowerlink.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Business Hours</h4>
                      <p className="text-slate-600 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Building%2010-6-87%2F2%2C%20Street%20Rural%20Police%20Station%2C%20Srinivasa%20Colony%2C%20Mahabubnagar%20509001%2C%20Telangana%2C%20India"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-200 rounded-3xl h-64 flex items-center justify-center overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-center p-8">
                  <MapPin size={48} className="text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Open in Google Maps</p>
                  <p className="text-xs text-slate-400 mt-2">Mahabubnagar, Telangana, India</p>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-2xl font-display font-bold text-primary mb-8">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="+91 0000000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white">
                        <option>Product Inquiry</option>
                        <option>Service Request</option>
                        <option>Technical Support</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-full font-bold flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Send Message
                    <Send className="ml-2" size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
