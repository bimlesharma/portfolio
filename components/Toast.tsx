'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  show: boolean;
}

export default function Toast({ message, type = 'success', show }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-none border border-border px-4 py-2 text-sm text-foreground
            ${type === 'success' ? 'bg-zinc-950' : 'bg-destructive text-white'}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
