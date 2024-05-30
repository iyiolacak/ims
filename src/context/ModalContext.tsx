import React from 'react'

interface IModalContext {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}
const ModalContext = () => {
  return (
    <div>ModalContext</div>
  )
}

export default ModalContext