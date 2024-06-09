"use client";
import React, { createContext, useContext } from 'react'
import { ToastContainer, toast, ToastContainerProps } from 'react-toastify'

interface ToastContextProps {
    toast: typeof toast;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context;
}
interface ToastProviderProps {
    children: React.ReactNode
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast }}>
        {children}
        <ToastContainer />
    </ToastContext.Provider>
  )
}

export default ToastProvider