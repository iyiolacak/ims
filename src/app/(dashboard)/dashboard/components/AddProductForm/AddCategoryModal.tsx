import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
          <DialogDescription>New category</DialogDescription>
        </DialogHeader>
        {/* Add your form or content here to handle adding a new category */}
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
