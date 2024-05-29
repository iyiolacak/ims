"use client";
import clsx from "clsx";
import React from "react";

interface IDynamicProductCategoryCard {
  categoryIcon: React.ReactNode;
  categoryName: string;
  categoryVolume: number;
  categoryValue: string;
  isSelected: boolean;
  onSelect: (categoryValue: string) => void;
}

const DynamicProductTypeCard: React.FC<IDynamicProductCategoryCard> = ({
  categoryIcon,
  categoryName,
  categoryVolume,
  categoryValue,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(categoryValue);
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "group flex shrink-0 w-56 h-36 bg-neutral-50 border-[1.5px] shadow-sm rounded-lg transition-all",
        {
          "hover:border-blue-300 hover:bg-white": !isSelected,
          "border-blue-500 hover:border-blue-600 bg-blue-50/20": isSelected,
        }
      )}
    >
      <div className="flex flex-col h-full p-3 justify-between">
        <div className={clsx("flex items-center justify-center size-10 bg-white border rounded-lg transition-all",
            {
                "text-blue-700": isSelected,
                "text-neutral-600": !isSelected,
            }
        )}>
          {categoryIcon}
        </div>
        <div className="">
          <h2 className={clsx("text-md text-start font-semibold transition-colors",
            {
                "group-hover:text-neutral-600 text-neutral-800": !isSelected,
                "text-blue-700": isSelected
            }
          )}>{categoryName}</h2>
          <p className="text-start text-neutral-500 text-sm">
            {categoryVolume.toLocaleString()} items
          </p>
        </div>
      </div>
    </button>
  );
};

export default DynamicProductTypeCard;
