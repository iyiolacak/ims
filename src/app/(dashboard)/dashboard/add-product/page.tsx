"use client";
import React, { useState } from "react";
import ProductImageSection from "../components/AddProductForm/ProductImageSection";
import WelcomeSection from "../components/WelcomeSection";
import DynamicTitle from "../components/DynamicTitle";
import ProductSettingsSection from "../components/AddProductForm/ProductSettingsSection";
import ProductStatusSection from "../components/AddProductForm/ProductStatusSection";
import ProductCategoriesSection from "../components/AddProductForm/ProductCategoriesSection";
import ProductDetails from "../components/AddProductForm/ProductDetails";
import { useForm } from "react-hook-form";
import { Id } from "@/../convex/_generated/dataModel";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedCategories, setSelectedCategories] = useState<
    Id<"categories">[]
  >([]);
  const [isCategoryLayoutOnEditingMode, setIsCategoryLayoutOnEditingMode] = useState<boolean>(false)

  const onSubmit = async (data) => {
    data.categories = selectedCategories; // Add selected categories to the form data.
  };
  return (
    <>
      <div className="flex flex-grow flex-col overflow-hidden">
        <div className="">
          <h1 className="w-full scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight">
            Create a New Product
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}> {/* form */}
          <div className="mt-4 flex">
            {/* Left side */}
            <div className="flex w-2/5 flex-col gap-y-4">
              <ProductImageSection />
              <ProductSettingsSection />
              <ProductStatusSection />
            </div>
            <div className="flex w-3/5 flex-col gap-y-4 pl-3">
              <ProductCategoriesSection onSelectCategories={() => {}} />
              <ProductDetails isCategoryLayoutOnEditingMode={isCategoryLayoutOnEditingMode}  />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
