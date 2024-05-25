// tableData.js

import {
  ArrowRight,
  Package,
  PackageCheck,
  Star,
} from "lucide-react";
import { formatProductDate } from "./TableComponent";

export const publishedColumns = [
  {
    accessorKey: "productId",
    header: "Product ID",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "firstStock",
    header: "First Stock",
    cell: ({ getValue }) => (
      <div className="flex flex-row items-center text-center p-1 bg-slate-100 rounded-lg font-semibold text-black w-min">
        <Package
          size={15}
          className="mr-1 text-slate-500 font-normal"
          strokeWidth={1.25}
        />
        {getValue().toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "arrow",
    header: "",
    cell: () => <ArrowRight size={15} className="text-slate-500"/>
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ getValue }) => (
      <div className="flex flex-row items-center p-1 bg-slate-100 rounded-lg font-semibold text-black w-min">
        <PackageCheck
          size={15}
          className="mr-1 text-slate-500 font-normal"
          strokeWidth={1.25}
        />
        {getValue().toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
    cell: ({ getValue }) => (
      <div className="text-xs px-1 text-slate-400 hover:text-slate-700 hover:p-10">
        {formatProductDate(getValue())}
      </div>
    ),
  },
  {
    accessorKey: "pricing",
    header: "Pricing",
    cell: ({ getValue }) => (<div><span className="">$</span>{getValue().toLocaleString()}</div>)
  },

  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "lastOrderedDate",
    header: "Last Ordered Date",
    cell: ({ getValue }) => (
      <div className="text-xs text-slate-400 hover:text-slate-700">
        {formatProductDate(getValue())}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ getValue }) => (getValue() ? (<div className="flex flex-row items-center font-semibold"><Star size={16} />{getValue()}</div>) : "N/A"),
  },
];

export const publishedData = [
  {
    productId: "001",
    productName: "iPad Pro",
    firstStock: 611,
    sold: 296,
    dateAdded: "2024-04-15",
    pricing: 999,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-10",
    rating: 4.5,
  },
  {
    productId: "002",
    productName: "iPhone 14",
    firstStock: 1328,
    sold: 1126,
    dateAdded: "2023-02-20",
    pricing: 799,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-12",
    rating: 4.7,
  },
  {
    productId: "003",
    productName: "iMac",
    firstStock: 150,
    sold: 96,
    dateAdded: "2023-03-10",
    pricing: 1299,
    supplier: "Apple Inc.",
    lastOrderedDate: "2023-05-15",
    rating: 4.8,
  },
  {
    productId: "004",
    productName: "MacBook Air",
    firstStock: 1560,
    sold: 1399,
    dateAdded: "2023-04-05",
    pricing: 999,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-18",
    rating: 4.6,
  },
  {
    productId: "005",
    productName: "MacBook Pro",
    firstStock: 1768,
    sold: 1246,
    dateAdded: "2023-05-25",
    pricing: 1999,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-20",
    rating: 4.9,
  },
  {
    productId: "006",
    productName: "iPad Air M2",
    firstStock: 610,
    sold: 81,
    dateAdded: "2023-01-15",
    pricing: 799,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-10",
    rating: 4.5,
  },
  {
    productId: "007",
    productName: "iPhone 13 Mini",
    firstStock: 764,
    sold: 643,
    dateAdded: "2023-02-20",
    pricing: 699,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-12",
    rating: 4.7,
  },
  {
    productId: "008",
    productName: 'iMac 24" M3',
    firstStock: 50,
    sold: 34,
    dateAdded: "2023-03-10",
    pricing: 1499,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-15",
    rating: 4.8,
  },
  {
    productId: "009",
    productName: "MacBook Air M2",
    firstStock: 150,
    sold: 120,
    dateAdded: "2023-04-05",
    pricing: 899,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-18",
    rating: 4.6,
  },
  {
    productId: "010",
    productName: 'MacBook Pro 13" M4',
    firstStock: 1100,
    sold: 394,
    dateAdded: "2024-02-25",
    pricing: 1999,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-20",
    rating: 4.9,
  },
];
export const draftData = [
  {
    productId: "011",
    productName: 'MacBook Air 13" M1',
    firstStock: 100,
    sold: 90,
    dateAdded: "2023-05-25",
    pricing: 1999,
    supplier: "Apple Inc.",
    lastOrderedDate: "2024-05-20",
    rating: 4.9,
  },
];
