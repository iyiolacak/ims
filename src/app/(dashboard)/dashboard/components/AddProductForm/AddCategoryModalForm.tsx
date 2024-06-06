"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, RefObject } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import EmojiPicker from "../EmojiPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema, CategoryFormValues } from "./schema"; // Adjust the import path based on your file structure
import { api } from "@/../convex/_generated/api";
import { useMutation } from "convex/react";
import { useUserId } from "@/context/UserContext"; // Adjust the import path based on your file structure
import { Id } from "@/../convex/_generated/dataModel"; // Import the Id type

interface CategoryFormValuesWithUserId extends CategoryFormValues {
  userId: Id<"users">;
}

const AddCategoryModalForm = ({
  formRef,
}: {
  onSubmit: (data: CategoryFormValues) => void;
  formRef: RefObject<HTMLFormElement>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
  });

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = methods;
  const userId = useUserId(); // Get the user ID from context

  useEffect(() => {
    setFocus("categoryName");
    if (userId) {
      setValue("userId", userId); // Set userId in the form data
      console.log("User ID set:", userId); // Debugging
    }
  }, [setFocus, userId, setValue]);

  const mutateCategory = useMutation(api.categories.addCategory);

  const handleAddCategory = async (categoryData: any) => {
    setIsSubmitting(true);
    const newCategories = [...categories, categoryData];
    setCategories(newCategories)
    try {
      const newCategoryId = await mutateCategory(categoryData);
    }
     catch (error) {
      console.error("handleAddCategory failed:", error);
    }
     finally {
      setIsSubmitting(false);
    }
  };

  const submitForm: SubmitHandler<CategoryFormValues> = async (data) => {
    console.log("Form data:", data); // Log form data
    if (!userId) {
      console.error("User ID not available");
      return;
    }

    const categoryData = {
      ...data,
      emoji: data.emoji || "",
      userId: userId as Id<"users">, // Convert userId to the correct type if needed
    };
    console.log("Category data to be submitted:", categoryData); // Log category data

    await handleAddCategory(categoryData);
  };

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(submitForm)}>
        <div>
          <EmojiPicker name="emoji" />
        </div>
        <div className="transition-all">
          <Input
            id="categoryName"
            {...register("categoryName")}
            className={`h-14 border-0 text-start text-4xl font-medium text-neutral-800 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.categoryName ? "animate-pulse-once placeholder:text-red-500" : ""}`}
            placeholder="Untitled Category"
          />
          {errors.userId && (
            <span className="text-red-600">{errors.userId.message}</span>
          )}{" "}
          {/* Display userId error */}
          {errors.emoji && (
            <span className="text-red-600">{errors.emoji.message}</span>
          )}
          {errors.categoryName && (
            <span className="pl-4 text-red-600">
              {errors.categoryName.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="mt-5"
          variant={"ghost"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddCategoryModalForm;
