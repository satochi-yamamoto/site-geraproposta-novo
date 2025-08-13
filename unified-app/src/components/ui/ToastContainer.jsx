import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContainer = ({ toasts, onRemove }) => {
  const getIcon = (variant) => {
    switch (variant) {
      case 'destructive':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (variant) => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`glass-effect rounded-lg p-4 border ${getColors(toast.variant)} min-w-80 max-w-md`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(toast.variant)}
              </div>
              <div className="flex-1">
                {toast.title && (
                  <h4 className="font-semibold text-white mb-1">{toast.title}</h4>
                )}
                {toast.description && (
                  <p className="text-sm text-gray-300">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 hover:bg-white/10 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
