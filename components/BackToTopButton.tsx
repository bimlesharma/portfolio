'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed right-3 bottom-6 z-50 rounded-none border border-border bg-primary p-3 text-primary-foreground transition hover:bg-primary/90 md:right-6 md:bottom-8"
        >
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
