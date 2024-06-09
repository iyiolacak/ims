import React from "react";
import FormCard from "./FormCard";
import clsx from "clsx";
import { Info } from "lucide-react";
interface ProductDetailsProps {
  isCategoryLayoutOnEditingMode: boolean;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({
  isCategoryLayoutOnEditingMode,
}) => {
  console.log("editing mode", isCategoryLayoutOnEditingMode);
  return (
    <FormCard
      title="Product Details"
      className={clsx(`h-full`, {
        "border-[2px] border-blue-600": isCategoryLayoutOnEditingMode,
      })}
      actionComponent={
        isCategoryLayoutOnEditingMode && (
          <div className="group items-center hover:bg-blue-50 px-2 rounded-full py-0.5 cursor-pointer transition-all">
            <span className="text-sm items-center font-medium text-blue-700 group-hover:text-blue-600 flex flex-row">
            Defining Category Items Layout
            <Info className="ml-1" size={16}/>
            </span>
          </div>
        )
      }
    >
      <div className="h-full"></div>
    </FormCard>
  );
};

export default React.memo(ProductDetails);
