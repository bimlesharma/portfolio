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
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
            ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
