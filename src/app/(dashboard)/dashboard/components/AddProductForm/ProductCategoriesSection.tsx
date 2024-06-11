"use client";
import React, { useEffect, useState } from "react";
import FormCard from "./FormCard";
import DynamicProductTypeCard from "./DynamicProductTypeCard";
import { FileQuestion, Plus } from "lucide-react";
import styles from "@/app/ScrollContainer.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useUserId } from "@/context/UserContext";
import { Id } from "@/../convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCategoriesSectionProps {
  onSelectCategories: (selectedCategories: Id<"categories">[]) => void;
}

const ProductCategoriesSection: React.FC<ProductCategoriesSectionProps> = ({
  onSelectCategories,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Id<"categories">[]
  >([]);
  const router = useRouter();
  const userId = useUserId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchedCategories = useQuery(
    api.categories.getCategoriesByUser,
    userId ? { userId } : "skip",
  );

  useEffect(() => {
    onSelectCategories(selectedCategories)
  }, [selectedCategories, onSelectCategories])
  const removeCategory = useMutation(api.categories.removeCategory);

  const handleClickAddCategory = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("create-category", "");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  // "+ Add Category" Action button component
  const AddCategoryButton: React.FC = () => {
    return (
      <Button
        className="text-md -m-2 flex font-semibold text-blue-700"
        variant={"invisible"}
        onClick={handleClickAddCategory}
      >
        <Plus size={16} className="mr-1" />
        Add Category
      </Button>
    );
  };

  // Data fetching loading state
  if (!fetchedCategories || !userId)
    return (
      <FormCard title="Category Type" actionComponent={<AddCategoryButton />}>
        <div className="flex flex-row gap-x-2">
          <Skeleton className="h-36 w-56" />
          <Skeleton className="h-36 w-56" />
          <Skeleton className="h-36 w-56" />
        </div>
      </FormCard>
    );

  console.log(fetchedCategories);

  const handleSelectCategory = (categoryId: Id<"categories">) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId],
    );
  };

  const handleDeleteCategory = async (categoryId: Id<"categories">) => {
    console.log("handleDeleteCategory called with categoryId:", categoryId);
    try {
      await removeCategory({ categoryId, userId });
      console.log(
        "removeCategory() successfully deleted category with categoryId:",
        categoryId,
      );
    } catch (error) {
      console.error("Failed to remove category:", error);
    }
  };

  // Create a new ordered array: selected categories first
  const orderedCategories = [
    ...fetchedCategories.filter((category) =>
      selectedCategories.includes(category._id),
    ),
    ...fetchedCategories.filter(
      (category) => !selectedCategories.includes(category._id),
    ),
  ];

  return (
    <FormCard title="Product Type" actionComponent={<AddCategoryButton />}>
      <div
        className={`flex flex-row gap-x-2 overflow-x-auto whitespace-nowrap ${styles.scrollContainer}`}
      >
        {orderedCategories.length === 0 ? (
          <button
            onClick={handleClickAddCategory}
            className="group flex h-36 w-56 shrink-0 border-spacing-10 rounded-lg border-2 border-dashed bg-white shadow-sm transition-all hover:bg-neutral-50"
          >
            <div className="flex h-full w-full flex-col items-center justify-center p-3">
              <div className="text-3xl font-extrabold text-neutral-400 transition-colors group-hover:text-neutral-500">
                <FileQuestion />
              </div>
              <div className="">
                <h2 className="text-md mt-2 flex h-full items-end justify-center font-medium text-neutral-400 transition-colors group-hover:text-neutral-500">
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
                  isSubmitting={isSubmitting}
                  // categoryVolume={category.categoryVolume}
                  categoryId={category._id}
                  isSelected={selectedCategories.includes(category._id)}
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

export default ProductCategoriesSection;
