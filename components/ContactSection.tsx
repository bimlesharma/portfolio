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
import { FaSpinner } from 'react-icons/fa';
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

  return (
    <section
      id="contact"
      className="min-h-screen bg-dark flex items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl rounded-xl bg-charcoal shadow-xl p-8 sm:p-12 space-y-8"
      >
        <h2 className="text-4xl font-extrabold text-white text-center tracking-wide">
          📬 Get In Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="input-dark"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input-dark"
            />
          </div>

          <input
            name="subject"
            type="text"
            placeholder="Subject (optional)"
            value={form.subject}
            onChange={handleChange}
            className="input-dark"
          />

          <textarea
            name="message"
            required
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            className="input-dark resize-none"
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-md transition duration-200 bg-orange-600 hover:bg-orange-700 ${
              status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {status === 'sending' ? (
              <>
                <FaSpinner className="animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 font-medium text-center"
            >
              ✅ Message sent successfully!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 font-medium text-center"
            >
              ❌ Something went wrong. Please try again.
            </motion.p>
          )}
        </form>
      </motion.div>

      <Toast show={toast.show} type={toast.type} message={toast.message} />
    </section>
  );
}
