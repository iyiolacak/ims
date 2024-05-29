import React, { useState } from "react";
import ProductImageSection from "../components/AddProductForm/ProductImageSection";
import WelcomeSection from "../components/WelcomeSection";
import DynamicTitle from "../components/DynamicTitle";
import ProductSettingsSection from "../components/AddProductForm/ProductSettingsSection";
import ProductStatusSection from "../components/AddProductForm/ProductStatusSection";
import ProductTypeSection from "../components/AddProductForm/ProductTypeSection";

const AddProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleSelectCategory = (categoryValue: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryValue)
        ? prevSelected.filter((value) => value !== categoryValue)
        : [...prevSelected, categoryValue]
    );
  };
  return (
    <>
      <div className="w-full">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight pb-4">
          Create a New Product
        </h1>
      </div>
      <div className="flex">
        {/* Left side */}
        <div className="flex flex-col w-2/5 gap-y-2">
          <ProductImageSection />
          <ProductSettingsSection />
          <ProductStatusSection />
        </div>
        <div className="flex flex-col w-3/5 pl-3">
          <ProductTypeSection />
        </div>
      </div>
    </>
  );
};

export default AddProduct;
