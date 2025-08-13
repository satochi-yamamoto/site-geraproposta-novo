import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '@/components/ui/ToastContainer';

const ToastContext = createContext();

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, variant = 'default', duration = 5000 }) => {
    const id = ++toastId;
    const newToast = { id, title, description, variant };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((options) => {
    return addToast(options);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
