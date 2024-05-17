// tableData.js
export const data = [
  {
    itemId: '001',
    itemName: 'Chicken Breast',
    category: 'Meat',
    quantityInStock: 50,
    reorderThreshold: 10,
    unitPrice: 3.75,
    supplier: 'Best Meats Co.',
    lastOrderedDate: '2024-05-10',
    expiryDate: '2024-06-01',
  },
  {
    itemId: '002',
    itemName: 'Carrots',
    category: 'Vegetables',
    quantityInStock: 100,
    reorderThreshold: 20,
    unitPrice: 0.50,
    supplier: 'Fresh Veggies Ltd.',
    lastOrderedDate: '2024-05-12',
    expiryDate: '2024-05-30',
  },
  // Add more items as needed...
];


export const columns = [
  {
    accessorKey: 'itemId',
    header: 'Item ID',
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'itemName',
    header: 'Item Name',
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'quantityInStock',
    header: 'Quantity in Stock',
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'reorderThreshold',
    header: 'Reorder Threshold',
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'lastOrderedDate',
    header: 'Last Ordered Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ getValue }) => getValue() ? new Date(getValue()).toLocaleDateString() : 'N/A',
  },
];