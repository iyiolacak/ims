import { Dialog } from "@/components/ui/dialog";
import React from "react";
import AddCategoryModal from "./AddProductForm/AddCategoryModal";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AddCategoryModal />
      {children}
    </div>
  );
};

export default ModalProvider;
