"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import EmojiPicker from "../EmojiPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema, CategoryFormValues } from "./schema"; // Adjust the import path based on your file structure
import { api } from "@/../convex/_generated/api";
import { useMutation } from "convex/react";
import { useUserId } from "@/context/UserContext"; // Adjust the import path based on your file structure
import { Id } from "@/../convex/_generated/dataModel"; // Import the Id type

const AddCategoryModalForm = ({
  onSubmit,
  formRef,
}: {
  onSubmit: (data: CategoryFormValues) => void;
  formRef: React.RefObject<HTMLFormElement>;
}) => {
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

    try {
      const newCategoryId = await mutateCategory(categoryData);
      console.log("New Category ID:", newCategoryId); // for Debugging
      onSubmit(data);
    } catch (error) {
      console.error("Error adding new category", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(submitForm)}>
        <div>
          <EmojiPicker name="emoji" />
        </div>
        <div>
          <Input
            id="categoryName"
            {...register("categoryName")}
            className="h-14 text-4xl focus:ring-0 text-start border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium text-neutral-800"
            placeholder="Untitled Category"
          />
          {errors.userId && <span>{errors.userId.message}</span>} {/* Display userId error */}
          {errors.emoji && <span>{errors.emoji.message}</span>}
          {errors.categoryName && <span>{errors.categoryName.message}</span>}
        </div>
        <Button type="submit" className="mt-5" variant={"ghost"}>
          Create
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddCategoryModalForm;
