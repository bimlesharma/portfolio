'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaRss } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/bimlesharma', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/bimlesharma', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/bimlesharma', label: 'Twitter' },
  ];

  return (
    <footer className="relative overflow-x-hidden border-t border-border bg-background text-muted-foreground">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Bimlesh
            </h3>
            <p className="text-sm leading-relaxed">
              Full-stack engineer crafting scalable solutions and innovative web experiences.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt />
              <span>New Delhi, India</span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Get In Touch</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:bimlesh.mdb@gmail.com"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
                >
                  <FaEnvelope />
                  bimlesh.mdb@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/bimlesharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
                >
                  <FaLinkedin />
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bimlesharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-foreground"
                >
                  <FaGithub />
                  GitHub Profile
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="outline" size="icon" asChild>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                </Button>
              ))}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Button asChild size="sm">
                <a href="#contact">Let&apos;s Work Together</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog">All Posts</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/blog/feed.xml" target="_blank" rel="noopener noreferrer">
                  <FaRss />
                  RSS Feed
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="flex flex-col items-center justify-between gap-2 text-sm md:flex-row">
          <p>© {currentYear} Bimlesh. Built with Next.js</p>
          <p>Designed & Developed by Bimlesh</p>
        </div>
      </div>
    </footer>
  );
}
