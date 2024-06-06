"use client";
import React, { useState } from "react";
import FormCard from "./FormCard";
import DynamicProductTypeCard from "./DynamicProductTypeCard";
import { FileQuestion, Plus } from "lucide-react";
import styles from "@/app/ScrollContainer.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/../convex/_generated/api'
import { useUserId } from '@/context/UserContext'
import { Id } from "@/../convex/_generated/dataModel";

// Define the category type
type Category = {
  categoryName: string;
  emoji?: string;
  categoryId: Id<"categories">;
  // categoryVolume: number;
};

const ProductTypeSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<Id<"categories">[]>([]);
  const router = useRouter();
  const userId = useUserId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchedCategories = useQuery(api.categories.getCategoriesByUser, userId ? { userId } : 'skip');
  const removeCategory = useMutation(api.categories.removeCategory);

  if (!fetchedCategories || !userId) return <div>Loading...</div>;

  console.log(fetchedCategories);

  const handleSelectCategory = (categoryId: Id<"categories">) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleDeleteCategory = async (categoryId: Id<"categories">) => {
    console.log("handleDeleteCategory called with categoryId:", categoryId);
    try {
      await removeCategory({ categoryId, userId });
      console.log("removeCategory() successfully deleted category with categoryId:", categoryId);
    } catch (error) {
      console.error("Failed to remove category:", error);
    }
  };

  // Create a new ordered array: selected categories first
  const orderedCategories = [
    ...fetchedCategories.filter((category) =>
      selectedCategories.includes(category._id)
    ),  
    ...fetchedCategories.filter(
      (category) => !selectedCategories.includes(category._id)
    ),
  ];

  const handleClickAddCategory = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("create-category", "");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  const AddCategoryButton: React.FC = () => {
    return (
      <Button
        className="flex text-blue-700 text-md font-medium -m-2"
        variant={"invisible"}
        onClick={handleClickAddCategory}
      >
        <Plus size={16} className="mr-1" />
        Add Category
      </Button>
    );
  };

  return (
    <FormCard title="Product Type" actionComponent={<AddCategoryButton />}>
      <div
        className={`flex flex-row gap-x-2 overflow-x-auto whitespace-nowrap ${styles.scrollContainer}`}
      >
        {orderedCategories.length === 0 ? (
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
        ) : (
          <AnimatePresence>
            {orderedCategories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
              >
                <DynamicProductTypeCard
                  key={index}
                  categoryName={category.categoryName}
                  emoji={category.emoji}
                  // categoryVolume={category.categoryVolume}
                  categoryId={category._id}
                  isSelected={selectedCategories.includes(
                    category._id
                  )}
                  onSelect={handleSelectCategory}
                  onDelete={handleDeleteCategory} // Pass the delete handler as a prop
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </FormCard>
  );
};

export default ProductTypeSection;
