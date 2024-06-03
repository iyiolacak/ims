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
        className="flex text-blue-700 text-md font-m
