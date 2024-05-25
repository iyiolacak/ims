"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import DynamicTable from "./DynamicTable";
import clsx from "clsx";
import {
  Package2Icon,
  Pencil,
} from "lucide-react";
import { publishedData, publishedColumns, draftData } from "./tableData";
export function formatProductDate(dateStr: string) {
  const currentYear = new Date().getFullYear();
  const dateObj = new Date(dateStr);

  // const dateStr = "2024-08-19"; // example date format received from the backend.

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  let formattedDate;
  if (year === currentYear) {
    formattedDate = `${day} ${month}`;
  } else {
    formattedDate = `${day} ${month} ${year}`;
  }
  return formattedDate;
}
interface Data {}
interface DynamicTableProps {
  data: Data[];
}
const TableComponent = () => {
  const [isPublished, setIsPublished] = useState("published");
  function handleTab(tab: "published" | "draft") {
    return setIsPublished(tab);
  }
  const data = isPublished === "published" ? publishedData : draftData;
  const columns =
    isPublished === "published" ? publishedColumns : publishedColumns;

  return (
    <div className="bg-white border rounded-2xl my-4 shadow-sm pb-4">
      <div className="flex items-center p-1 *:rounded-full">
        <Button
          className={clsx(
            `font-medium text-md text-slate-500 px-3.5 py-1  hover:bg-slate-100 transition-all`,

            {
              "font-bold text-slate-900 bg-slate-100":
                isPublished === "published",
            }
          )}
          variant={"invisible"}
          onClick={() => handleTab("published")}
        >
          <Package2Icon size={16} className="mr-1" />
          Published
        </Button>
        <Button
          className={clsx(
            `font-medium text-md text-slate-500 p-3.5 hover:bg-slate-100 transition-all`,

            {
              "font-bold text-md text-slate-900 p-3.5  hover:bg-slate-100 bg-slate-100":
                isPublished === "draft",
            }
          )}
          variant={"invisible"}
          onClick={() => handleTab("draft")}
        >
          <Pencil size={16} className="mr-1" />
          Draft
        </Button>
      </div>
      <div className="flex items-center justify-center transition-all">
        <DynamicTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default TableComponent;
