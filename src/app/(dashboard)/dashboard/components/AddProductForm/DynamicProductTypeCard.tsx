"use client";
import clsx from "clsx";
import React from "react";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PencilLine, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface IDynamicProductCategoryCard {
  emoji?: string;
  categoryName: string;
  // categoryVolume: number;
  categoryId: Id<"categories">;
  isSelected: boolean;
  onSelect: (categoryId: Id<"categories">) => void;
  onDelete: (categoryId: Id<"categories">) => void; // Add onDelete prop
}

const DynamicProductTypeCard: React.FC<IDynamicProductCategoryCard> = ({
  emoji,
  categoryName,
  // categoryVolume,
  categoryId,
  isSelected,
  onSelect,
  onDelete, // Destructure onDelete
}) => {
  const handleClick = () => {
    onSelect(categoryId);
  };

  const handleDelete = () => {
    console.log("Delete button clicked for categoryId:", categoryId);
    onDelete(categoryId);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "group flex shrink-0 w-96 h-36 bg-neutral-500 shadow-sm rounded-lg transition-all border-[1.5px]",
        {
          "hover:border-blue-300 hover:bg-white": !isSelected,
          "border-blue-500 hover:border-blue-600 bg-blue-50/20": isSelected,
        }
      )}
    >
      <div className="w-full flex flex-col h-full p-3 justify-between">
        <div className="w-full flex flex-row justify-between">
          <div className={clsx("flex items-center justify-center size-10 bg-white border rounded-lg transition-all text-3xl",
            {
              "text-blue-700 border-blue-700": isSelected,
              "text-neutral-600": !isSelected,
            }
          )}>
            {emoji}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"sm"} className="rounded-lg h-8 text-neutral-300 -mt-1">
                <MoreHorizontal size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                Category
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <PencilLine className="mr-2 text-neutral-600" size={16} />
                  <span>Edit</span>
                  <DropdownMenuShortcut>F2</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}>
                  <Trash className="mr-2 text-neutral-600" size={16} />
                  <span>Delete</span>
                  <DropdownMenuShortcut>DEL</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <h2 className={clsx("text-md text-start font-semibold transition-colors",
            {
              "group-hover:text-neutral-600 text-neutral-800": !isSelected,
              "text-blue-700": isSelected
            }
          )}>{categoryName}</h2>
          <p className="text-start text-neutral-500 text-sm">
            {/* {categoryVolume.toLocaleString()} items */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicProductTypeCard;
