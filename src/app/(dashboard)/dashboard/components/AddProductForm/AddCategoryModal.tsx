"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCategoryModalForm, {
} from "./AddCategoryModalForm";
import { CategoryFormValues } from "./schema";
import { useRouter, useSearchParams } from "next/navigation";

interface IAddCategoryModal {
  children?: React.ReactNode;
}

const AddCategoryModal = ({ children }: IAddCategoryModal) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isOpen = searchParams.has("create-category");
  console.log("Modal isOpen state:", isOpen); // renders twice

  const handleOpenChange = (open: boolean) => {
    console.log("handleOpenChange called with open:", open);

    const params = new URLSearchParams(searchParams as any);

    if (open) {
      params.set("create-category", "");
    } else {
      params.delete("create-category");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log("New URL:", newUrl);
    router.replace(newUrl);
  };

  const handleSubmit = (data: CategoryFormValues) => {
    console.log(data);

    // perform form submit logic here - API POST - Convex.

    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Category</DialogTitle>
        </DialogHeader>
        <AddCategoryModalForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
