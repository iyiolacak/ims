"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import EmojiPicker from "../EmojiPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema, CategoryFormValues } from "./schema"; // Adjust the import path based on your file structure

const AddCategoryModalForm = ({
  onSubmit,
}: {
  onSubmit: (data: CategoryFormValues) => void;
}) => {
  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(addCategorySchema),
  });

  const { register, handleSubmit, setFocus, setValue, formState: { errors }, watch } = methods;

  useEffect(() => {
    setFocus("categoryName");
  }, [setFocus]);

  // Debugging log to see form values
  console.log("Form values:", watch());

  const handleSubmitWithLogs: SubmitHandler<CategoryFormValues> = (data) => {
    console.log("Form Submitted:", data);
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitWithLogs)}>
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
