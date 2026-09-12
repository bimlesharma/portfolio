'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
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
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/bimlesharma',
      link: 'https://linkedin.com/in/bimlesharma',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/bimlesharma',
      link: 'https://github.com/bimlesharma',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'New Delhi, India',
      link: '',
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-12"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeader
            title="Get In Touch"
            description="Have a question or want to work together? Feel free to reach out!"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                      <Card className="py-4 transition-colors hover:bg-muted/40">
                        <CardContent className="flex items-center gap-4">
                          <div className="flex size-10 shrink-0 items-center justify-center border bg-muted">
                            <info.icon size={16} className="text-foreground" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-muted-foreground">
                              {info.label}
                            </p>
                            <p className="truncate text-sm font-medium text-foreground">
                              {info.value}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ) : (
                    <Card className="py-4">
                      <CardContent className="flex items-center gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center border bg-muted">
                          <info.icon size={16} className="text-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            {info.label}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {info.value}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
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
              className="border bg-muted/40 p-4"
            >
              <h3 className="mb-1 text-sm font-semibold text-foreground">
                Quick Response
              </h3>
              <p className="text-sm text-muted-foreground">
                I typically respond within 24 hours. For urgent matters, reach out via LinkedIn or email.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="py-5">
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Tell me about your project or inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'sending'}
                className="w-full"
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
              </Button>

              {status === 'success' && (
                <p className="border border-border bg-muted p-3 text-center text-sm text-foreground">
                  Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="border border-destructive/40 bg-destructive/10 p-3 text-center text-sm text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
