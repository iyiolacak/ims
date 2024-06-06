import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify'

interface ToastProps {
  message: string;
  onClose: () => void;
}
const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white p-4 fixed right-5 top-5 z-[1000]"
    >{message}
    <Button onClick={onClose} className="ml-4 bg-transparent text-white cursor-pointer border-none" variant={"invisible"}>
        Close
    </Button>
    </motion.div>
        

  );
};

export default Toast;
