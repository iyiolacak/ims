import React from "react";
interface DynamicTitleProps {
  dataTitle: string;
  dataMonth?: string;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({
  dataTitle,
  dataMonth,
}) => {
  return (
    <p className="mt-2 text-slate-400 text-md group-hover:w-full group-hover:bg-red-400">
      <span className="group px-1 hover:text-blue-700 hover:font-semibold hover:bg-slate-100 hover:px-2 transition-all rounded-full cursor-pointer hover:select-none">
        {dataMonth}
      </span>
      {dataTitle}
    </p>
  );
};

export default DynamicTitle;
