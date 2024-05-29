import React from "react";
import FormCard from "./FormCard";
import DynamicProductTypeCard from "./DynamicProductTypeCard";
import { Phone, Smartphone } from "lucide-react";
import categories from "../categoriesData";
import styles from '@/app/ScrollContainer.module.css'

const ProductTypeSection = () => {
  return (
    <FormCard title="Product Type">
      <div className={`flex flex-row gap-x-2 overflow-x-auto whitespace-nowrap ${styles.scrollContainer}`}>
        {categories.map((category, index) => (
          <DynamicProductTypeCard
            key={index}
            categoryIcon={category.categoryIcon}
            categoryName={category.categoryName}
            categoryVolume={category.categoryVolume}
            categoryValue={category.categoryValue}
          />
        ))}
      </div>
    </FormCard>
  );
};

export default ProductTypeSection;
