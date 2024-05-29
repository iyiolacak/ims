"use client";
import React, { useState } from "react";
import FormCard from "./FormCard";
import DynamicProductTypeCard from "./DynamicProductTypeCard";
import { FileQuestion, Plus } from "lucide-react";
import { categoriesEmpty as categories } from "../categoriesData";
import styles from "@/app/ScrollContainer.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AddCategoryModal from "./AddCategoryModal";

// Define the category type
type Category = {
  categoryValue: string;
  categoryIcon: React.ReactNode;
  categoryName: string;
  categoryVolume: number;
};

const ProductTypeSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]); // Initialize with an empty array

  const handleSelectCategory = (categoryValue: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryValue)
        ? prevSelected.filter((value) => value !== categoryValue)
        : [...prevSelected, categoryValue]
    );
  };

  const handleAddCategory = (newCategory: Category) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // Create a new ordered array: selected categories first
  const orderedCategories = [
    ...categories.filter((category) =>
      selectedCategories.includes(category.categoryValue)
    ),
    ...categories.filter(
      (category) => !selectedCategories.includes(category.categoryValue)
    ),
  ];

  const handleClickAddCategory = () => {
    setIsModalOpen(true);
  };

  const AddCategoryButton: React.FC = () => {
    return (
      <AddCategoryModal>
        <Button
          className="flex text-blue-700 text-md font-medium -m-2"
          variant={"invisible"}
          onClick={handleClickAddCategory}
        >
          <Plus size={16} className="mr-1" />
          Add Category
        </Button>
      </AddCategoryModal>
    );
  };

  return (
    <FormCard title="Product Type" actionComponent={<AddCategoryButton />}>
      <div
        className={`flex flex-row gap-x-2 overflow-x-auto whitespace-nowrap ${styles.scrollContainer}`}
      >
        {orderedCategories.length === 0 ? (
          <AddCategoryModal>
            <button
              onClick={handleClickAddCategory}
              className="group flex shrink-0 w-56 h-36 bg-white hover:bg-neutral-50 border-2 border-dashed border-spacing-10 shadow-sm rounded-lg transition-all"
            >
              <div className="flex flex-col items-center justify-center h-full p-3 w-full">
                <div className="text-3xl text-neutral-400 group-hover:text-neutral-500 transition-colors font-extrabold">
                  <FileQuestion />
                </div>
                <div className="">
                  <h2 className="flex h-full mt-2 items-end group-hover:text-neutral-500 transition-colors justify-center text-md font-medium text-neutral-400">
                    Please add a category
                  </h2>
                </div>
              </div>
            </button>
          </AddCategoryModal>
        ) : (
          <AnimatePresence>
            {orderedCategories.map((category, index) => (
              <motion.div
                key={category.categoryValue}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
              >
                <DynamicProductTypeCard
                  key={index}
                  categoryIcon={category.categoryIcon}
                  categoryName={category.categoryName}
                  categoryVolume={category.categoryVolume}
                  categoryValue={category.categoryValue}
                  isSelected={selectedCategories.includes(
                    category.categoryValue
                  )}
                  onSelect={handleSelectCategory}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
    </FormCard>
  );
};

export default ProductTypeSection;
