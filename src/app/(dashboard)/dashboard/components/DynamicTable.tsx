"use client";
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowBigDown, ArrowDown } from "lucide-react";

const DynamicTable = ({ columns, data }) => {
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <table className="w-full bg-white">
        <thead className="">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border ">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="group items-center py-4 px-2 border-b text-left text-xs uppercase text-slate-400 cursor-pointer hover:bg-slate-50 hover:text-slate-700 font-medium  rounded-2xl " onClick={() => {}}>
                  <div className="w-full flex flex-row items-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <div className="">
                    <ArrowDown size={14} className="flex justify-end items-end text-white group-hover:text-slate-400 transition-colors"/>
                  </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id} className="min-w-full text-sm font-normal odd:bg-slate-50 even:bg-white text-slate-700">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
