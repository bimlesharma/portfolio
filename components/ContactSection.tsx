// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaSpinner } from 'react-icons/fa';
// import Toast from './Toast';

// export default function ContactSection() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

//   const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
//   show: false,
//   type: 'success',
//   message: '',
// });

// function showToast(type: 'success' | 'error', message: string) {
//   setToast({ show: true, type, message });
//   setTimeout(() => {
//     setToast({ show: false, type, message: '' });
//   }, 4000);
// }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('sending');

//     const payload = {
//       ...form,
//       subject: form.subject.trim() || `Message from ${form.name}`,
//     };

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setForm({ name: '', email: '', subject: '', message: '' });
//         setStatus('success');
//         showToast('success', 'Message sent successfully!');
//       } else {
//         setStatus('error');
//         showToast('error', 'Failed to send message.');
//       }
//     } catch (err) {
//       setStatus('error');
//     }

//     setTimeout(() => setStatus('idle'), 5000);
//   };

//   return (
//     <section
//       id="contact"
//       className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center py-20 px-4"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-800 shadow-xl p-8 sm:p-12 space-y-6"
//       >
//         <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white text-center">
//           Contact Me
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input
//               name="name"
//               type="text"
//               required
//               placeholder="Your Name"
//               value={form.name}
//               onChange={handleChange}
//               className="input-field"
//             />
//             <input
//               name="email"
//               type="email"
//               required
//               placeholder="Your Email"
//               value={form.email}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>

//           <input
//             name="subject"
//             type="text"
//             placeholder="Subject (optional)"
//             value={form.subject}
//             onChange={handleChange}
//             className="input-field"
//           />

//           <textarea
//             name="message"
//             required
//             placeholder="Your Message"
//             value={form.message}
//             onChange={handleChange}
//             rows={6}
//             className="input-field resize-none"
//           ></textarea>

//           <button
//             type="submit"
//             disabled={status === 'sending'}
//             className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-md transition duration-200 ${
//               status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
//             }`}
//           >
//             {status === 'sending' ? (
//               <>
//                 <FaSpinner className="animate-spin" />
//                 Sending...
//               </>
//             ) : (
//               'Send Message'
//             )}
//           </button>

//           {status === 'success' && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-green-600 font-medium text-center"
//             >
//               ✅ Your message has been sent!
//             </motion.p>
//           )}
//           {status === 'error' && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-red-600 font-medium text-center"
//             >
//               ❌ Something went wrong. Please try again.
//             </motion.p>
//           )}
//         </form>
//       </motion.div>

//       <Toast show={toast.show} type={toast.type} message={toast.message} />
//     </section>
//   );
// }


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
      className="relative min-h-screen bg-white dark:bg-slate-900 py-20 px-4"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
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
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
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
                      className="flex items-center gap-4 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}20` }}
                      >
                        <info.icon size={24} style={{ color: info.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          {info.label}
                        </p>
                        <p className="text-base font-medium text-slate-900 dark:text-slate-100 truncate">
                          {info.value}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}20` }}
                      >
                        <info.icon size={24} style={{ color: info.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          {info.label}
                        </p>
                        <p className="text-base font-medium text-slate-900 dark:text-slate-100">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                💡 Quick Response
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                I typically respond within 24 hours. For urgent matters, feel free to reach out via LinkedIn or email directly.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project or inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold rounded-lg transition duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
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
