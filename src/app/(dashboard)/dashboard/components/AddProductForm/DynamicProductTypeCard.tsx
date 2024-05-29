"use client";
import clsx from "clsx";
import { LucideProps } from "lucide-react";
import React from "react";

interface IDynamicProductCategoryCard {
  categoryIcon: React.ReactNode;
  categoryName: string;
  categoryVolume: number;
  categoryValue: string;
}

const DynamicProductTypeCard: React.FC<IDynamicProductCategoryCard> = ({
  categoryIcon,
  categoryName,
  categoryVolume,
  categoryValue,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(false);
  const handleClick = (e: any) => {
    setSelectedValue(!categoryValue);
  }
    return (
      <button
        onClick={handleClick}
        className={clsx(
          "flex shrink-0 w-56 h-36 bg-neutral-50 border-[1.5px] shadow-sm rounded-lg transition-all",
          {
            "hover:border-blue-300": true && !selectedValue,
            "border-blue-500 hover:border-blue-500": selectedValue,
          }
        )}
      >
        <div className="flex flex-col h-full p-3 justify-between">
          <div className="flex items-center justify-center size-10 bg-white border rounded-lg text-neutral-600">
            {categoryIcon}
          </div>
          {/* category title */}
          <div className="">
            <h2 className="text-md font-semibold">{categoryName}</h2>
            <p className="text-neutral-500 text-sm">
              {categoryVolume.toLocaleString()} items
            </p>
          </div>
        </div>
      </button>
    );
;
};

export default DynamicProductTypeCard;
