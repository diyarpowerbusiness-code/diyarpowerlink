import React, { useEffect, useState } from 'react';
import { SectionHeader } from '../components/UI';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { API_BASE } from '../api';

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: '5', review: '' });
  const [reviewStatus, setReviewStatus] = useState('');
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => data && Object.keys(data).length > 0 && setSettings(data))
      .catch(() => null);
  }, []);

  const contact = settings.contactPage || {};
  const mapQuery = encodeURIComponent(settings.contactAddress || 'Mahabubnagar, Telangana, India');
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message
        })
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('Message sent successfully.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('Failed to send. Please try again.');
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewStatus('Submitting...');
    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewForm.name,
          email: reviewForm.email,
          rating: Number(reviewForm.rating),
          review: reviewForm.review
        })
      });
      if (!res.ok) throw new Error('Failed');
      setReviewStatus('Thanks for your feedback!');
      setReviewForm({ name: '', email: '', rating: '5', review: '' });
    } catch {
      setReviewStatus('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6">
            {contact.heroTitle || 'Get in Touch'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {contact.heroSubtitle || 'We appreciate your time and attention. Reach out to us for all your IT needs.'}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={contact.faqTitle || 'Frequently Asked Questions'}
            subtitle={contact.faqSubtitle || 'Quick answers to common inquiries about our products and services.'}
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {(contact.faqs?.length
              ? contact.faqs.map((faq: any) => ({ q: faq.question, a: faq.answer }))
              : [
                  { q: 'Do you provide onsite technical support?', a: 'Yes, we provide both onsite and remote technical support for all hardware and software solutions we supply.' },
                  { q: 'Can I get customized thermal rolls with my logo?', a: 'Absolutely! We specialize in custom-printed thermal rolls for branding and promotional purposes.' },
                  { q: 'What is the standard delivery time?', a: 'Delivery times vary by location, but we typically fulfill orders within 2-5 business days across India.' },
                  { q: 'Are your paper products BPA-free?', a: 'Yes, all our thermal paper products are BPA-free and meet international safety and quality standards.' }
                ]
            ).map((faq: any, i: number) => (
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
                <h3 className="text-2xl font-display font-bold text-primary mb-8">{contact.infoTitle || 'Get in Touch'}</h3>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Our Address</h4>
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 text-sm leading-relaxed hover:text-blue-600 transition-colors"
                      >
                        {settings.contactAddress || 'Building 10-6-87/2, Street Rural Police Station, Srinivasa Colony, Mahabubnagar - 509001, Telangana, India'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Phone Number</h4>
                      <a href={`tel:${settings.contactPhone || '+918688050498'}`} className="text-slate-600 text-sm hover:text-blue-600 transition-colors">
                        {settings.contactPhone || '+91 8688050498'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Email Address</h4>
                      <a href={`mailto:${settings.contactEmail || 'info@diyarpowerlink.com'}`} className="text-slate-600 text-sm hover:text-blue-600 transition-colors">
                        {settings.contactEmail || 'info@diyarpowerlink.com'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Business Hours</h4>
                      <p className="text-slate-600 text-sm">{settings.businessHours || 'Mon - Sat: 9:00 AM - 6:00 PM'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-200 rounded-3xl h-64 flex items-center justify-center overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-center p-8">
                  <MapPin size={48} className="text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">{contact.mapLabel || 'Open in Google Maps'}</p>
                  <p className="text-xs text-slate-400 mt-2">{contact.mapSubLabel || 'Mahabubnagar, Telangana, India'}</p>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-2xl font-display font-bold text-primary mb-8">{contact.formTitle || 'Send us a Message'}</h3>
                <form className="space-y-6" onSubmit={submit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
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
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Product Inquiry"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  {status && <p className="text-sm text-slate-600">{status}</p>}
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-full font-bold flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Send Message
                    <Send className="ml-2" size={20} />
                  </button>
                </form>
              </div>

              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 mt-10">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Customer Feedback</h3>
                <p className="text-slate-600 text-sm mb-8">Share your experience with us. We read every review.</p>
                <form className="space-y-6" onSubmit={submitReview}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your full name"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="you@example.com"
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us what you liked or what we can improve."
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  {reviewStatus && <p className="text-sm text-slate-600">{reviewStatus}</p>}
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-full font-bold flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Submit Review
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
