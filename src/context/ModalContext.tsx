// "use client";
// import AddCategoryModal from '@/app/(dashboard)/dashboard/components/AddProductForm/AddCategoryModal';
// import { Dialog } from '@/components/ui/dialog';
// import React, { createContext, useContext, useState } from 'react'

// interface IModalContext {
//     isOpen: boolean;
//     openModal: () => void;
//     closeModal: () => void;
// }

// const ModalContext = createContext<IModalContext | undefined>(undefined);

// const ModalProvider = ({ children}: { children: React.ReactNode }) => {
//   const [isOpen, setIsOpen] = useState(false)

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);
  
//   return (
//     <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
//       <AddCategoryModal>
//       {children}
//       </AddCategoryModal>
//     </ModalContext.Provider>
//     )
// }

// const useModal = () => {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error("useModal must be used within a ModalProvider")
//   }
//   return context;
// }

// export { ModalProvider, useModal };