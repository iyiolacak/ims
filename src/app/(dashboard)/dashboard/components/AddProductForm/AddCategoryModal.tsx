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
import { CategoryFormValues } from "./schema";
import { useRouter, useSearchParams } from "next/navigation";
import useSubmitOnEnter from "@/hooks/useSubmitOnEnter";
import { addCategory } from "@/../convex/categories";
import { useMutation } from 'convex/react'
import { api } from "@/../convex/_generated/api"

interface IAddCategoryModal {
  children?: React.ReactNode;
}

const AddCategoryModal = ({ children }: IAddCategoryModal) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const isOpen = searchParams.has("create-category");

  const handleOpenChange = (open: boolean) => {
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
    // perform form submit logic here - API POST - Convex.
    console.log("handleSubmit", data);
    handleOpenChange(false);
  };

  useSubmitOnEnter(() => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
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
        <AddCategoryModalForm formRef={formRef} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
