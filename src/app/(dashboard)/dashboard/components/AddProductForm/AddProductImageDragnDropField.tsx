import { ImageIcon } from "lucide-react";
import React from "react";

const AddProductImageDragnDropField = () => {
  return (
    <div className="">
      <div className="flex-shrink-0 group size-48 rounded-lg border-2 border-dashed cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
          <ImageIcon strokeWidth={1.5} className="text-neutral-300" />
          <p className="text-center text-slate-400 text-xs pt-2 select-none break-words">
            Drop your image here, or select{" "}
            <span className="text-blue-700 underline underline-offset-2 font-medium group-hover:text-blue-500 transition-all">
              Click to browse
            </span>
          </p>
        </div>
      </div>
      {/* Repeat the image-card div as needed */}
    </div>
  );
};

export default AddProductImageDragnDropField;
