// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function ContactSection() {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setStatus('sending');

//     const res = await fetch('/api/contact', {
//       method: 'POST',
//       body: JSON.stringify(form),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (res.ok) {
//       setStatus('success');
//       setForm({ name: '', email: '', message: '' });
//     } else {
//       setStatus('error');
//     }
//   }

//   return (
//     <section id="contact" className="py-20 px-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-white">
//       <div className="max-w-3xl mx-auto text-center space-y-8">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-bold"
//         >
//           Contact Me
//         </motion.h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="text"
//             placeholder="Your Name"
//             className="w-full px-4 py-3 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             className="w-full px-4 py-3 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//           />
//           <textarea
//             placeholder="Your Message"
//             className="w-full px-4 py-3 h-32 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
//             value={form.message}
//             onChange={(e) => setForm({ ...form, message: e.target.value })}
//             required
//           ></textarea>

//           <button
//             type="submit"
//             disabled={status === 'sending'}
//             className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
//           >
//             {status === 'sending' ? 'Sending...' : 'Send Message'}
//           </button>

//           {status === 'success' && (
//             <p className="text-green-600">Message sent successfully!</p>
//           )}
//           {status === 'error' && (
//             <p className="text-red-600">Oops! Something went wrong.</p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// }


'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative py-20 pb-32 bg-neutral-50 dark:bg-neutral-950">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
        >
          Contact Me
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-3 h-32 rounded-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {/* Feedback Messages */}
          {status === 'success' && (
            <p className="text-green-600">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600">Oops! Something went wrong.</p>
          )}
        </form>
      </div>
    </section>
  );
}
