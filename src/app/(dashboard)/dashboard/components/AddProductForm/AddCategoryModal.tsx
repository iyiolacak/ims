"use client";
import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCategoryModalForm from "./AddCategoryModalForm";
import { CategoryFormData } from "./schema";
import { useRouter, useSearchParams } from "next/navigation";
import useSubmitOnEnter from "@/hooks/useSubmitOnEnter";
import { addCategory } from "@/../convex/categories";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

interface AddCategoryModalProps {
  children?: React.ReactNode;
  onSubmit: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ children, onSubmit }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const isOpen = searchParams.has("create-category");

  const params = new URLSearchParams(searchParams as any);
  const handleOpenChange = (open: boolean) => {
    if (open) {
      params.set("create-category", "");
    } else {
      params.delete("create-category");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log("New URL:", newUrl);
    router.replace(newUrl);
  };

  useSubmitOnEnter(() => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  });
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Category</DialogTitle>
        </DialogHeader>
        <AddCategoryModalForm formRef={formRef} onClose={() => handleOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
