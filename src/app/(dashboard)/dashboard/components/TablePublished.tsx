"use client";
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DynamicTable = ({ columns, data }) => {
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="">
      <table className="min-w-full bg-white ">
        <thead className="">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-4 px-2 border-b font-medium text-left text-xs uppercase text-slate-400">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-sm odd:bg-slate-100 even:bg-white text-slate-700">
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
