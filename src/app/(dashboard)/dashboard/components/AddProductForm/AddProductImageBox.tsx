import { ImageIcon } from "lucide-react";
import React from "react";

const AddProductImageBox = () => {
  return (
    <div className="">
      <div className="flex-shrink-0 group size-48 rounded-lg border cursor-pointer bg-neutral-50">
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
          <ImageIcon strokeWidth={1.5} className="text-neutral-300" />
        </div>
      </div>
      {/* Repeat the image-card div as needed */}
    </div>
  );
};

export default AddProductImageBox;
