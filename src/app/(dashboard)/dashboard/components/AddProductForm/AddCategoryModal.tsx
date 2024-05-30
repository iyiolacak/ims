import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCategoryModalForm from "./AddCategoryModalForm";

interface IAddCategoryModal {
  children: React.ReactNode;
}

const AddCategoryModal = ({ children }: IAddCategoryModal) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Category</DialogTitle>
        </DialogHeader>
        <AddCategoryModalForm/>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
