'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import Toast from './Toast';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: '',
  });

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type, message: '' }), 4000);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const payload = {
      ...form,
      subject: form.subject.trim() || `Message from ${form.name}`,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setForm({ name: '', email: '', subject: '', message: '' });
        setStatus('success');
        showToast('success', 'Message sent successfully!');
      } else {
        setStatus('error');
        showToast('error', 'Failed to send message.');
      }
    } catch (err) {
      setStatus('error');
      showToast('error', 'Unexpected error occurred.');
      console.error('Error sending message:', err);
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'bimlesh.mdb@gmail.com',
      link: 'mailto:bimlesh.mdb@gmail.com',
      color: '#3B82F6',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/bimlesharma',
      link: 'https://linkedin.com/in/bimlesharma',
      color: '#0A66C2',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/bimlesharma',
      link: 'https://github.com/bimlesharma',
      color: '#6B7280',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'New Delhi, India',
      link: '',
      color: '#10B981',
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-slate-950 py-20 px-4 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-emerald-500/5" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a question or want to work together? Feel free to reach out!
          </motion.p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 group-hover:scale-105">
                        {/* Glow effect */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${info.color}, transparent 70%)`,
                          }}
                        />

                        <div className="relative flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)`,
                            }}
                          >
                            <info.icon size={24} style={{ color: info.color }} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-400 mb-0.5">
                              {info.label}
                            </p>
                            <p className="text-base font-semibold text-slate-100 truncate">
                              {info.value}
                            </p>
                          </div>

                          {/* Arrow */}
                          <svg
                            className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5">
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)`,
                          }}
                        >
                          <info.icon size={24} style={{ color: info.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-400 mb-0.5">
                            {info.label}
                          </p>
                          <p className="text-base font-semibold text-slate-100">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Response Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">
                    Quick Response
                  </h3>
                  <p className="text-sm text-slate-300">
                    I typically respond within 24 hours. For urgent matters, reach out via LinkedIn or email.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-slate-100 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-slate-100 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-slate-100 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project or inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-slate-100 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-bold rounded-xl transition-all duration-200 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-lg hover:shadow-xl hover:scale-105 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {status === 'sending' ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaEnvelope />
                    Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg"
                >
                  <p className="text-emerald-700 dark:text-emerald-400 font-medium text-center flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message sent successfully!
                  </p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-700 dark:text-red-400 font-medium text-center flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <Toast show={toast.show} type={toast.type} message={toast.message} />
    </section>
  );
}
