'use client';

import { useState } from 'react';
import { Loader2, Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'bimlesh.mdb@gmail.com',
    link: 'mailto:bimlesh.mdb@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-7070519696',
    link: 'tel:+917070519696',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/bimlesharma',
    link: 'https://linkedin.com/in/bimlesharma',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/bimlesharma',
    link: 'https://github.com/bimlesharma',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'New Delhi, India',
    link: '',
  },
];

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

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        {contactInfo.map((info) => {
          const body = (
            <Card className="py-4 transition-colors hover:bg-muted/40">
              <CardContent className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center border bg-muted">
                  <info.icon size={16} className="text-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">{info.label}</p>
                  <p className="truncate text-sm font-medium text-foreground">{info.value}</p>
                </div>
              </CardContent>
            </Card>
          );

          if (!info.link) return <div key={info.label}>{body}</div>;

          return (
            <a
              key={info.label}
              href={info.link}
              target={info.link.startsWith('http') ? '_blank' : undefined}
              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block"
            >
              {body}
            </a>
          );
        })}
      </div>

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

            <Button type="submit" disabled={status === 'sending'} className="w-full">
              {status === 'sending' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="size-4" />
                  Send Message
                </>
              )}
            </Button>

            {status === 'success' ? (
              <p className="border border-border bg-muted p-3 text-center text-sm text-foreground">
                Message sent successfully.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="border border-destructive/40 bg-destructive/10 p-3 text-center text-sm text-destructive">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
