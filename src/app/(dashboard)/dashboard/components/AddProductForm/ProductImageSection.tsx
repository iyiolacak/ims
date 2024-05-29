import { Image, ImageIcon, Info, InfoIcon } from "lucide-react";
import React from "react";
import AddProductImageDragnDropField from "./AddProductImageDragnDropField";
import styles from '@/app/ScrollContainer.module.css'
import AddProductImageBox from "./AddProductImageBox";
import FormCard from "./FormCard";

const ProductImageSection = () => {
  return (
    // container
    <FormCard title="Product Image">
        {/* Scrollable div */}
        <div className={styles.scrollContainer}>
            <AddProductImageDragnDropField/>
            <AddProductImageBox/>
            <AddProductImageBox/>
            <AddProductImageBox/>
            <AddProductImageBox/>
            <AddProductImageBox/>
            <AddProductImageBox/>
        </div>
        <div className="flex flex-row items-center mt-4">
          <InfoIcon size={16} className="mr-1"/>
          <p className="font-normal text-sm">
          Please upload at least four high-quality images.
          </p>
        </div>
    </FormCard> 
  );
};

export default ProductImageSection;
