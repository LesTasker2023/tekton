import type { Meta, StoryObj } from "@storybook/react";

import { DataTable, type Column } from "./DataTable";
import { Badge } from "../Badge/Badge";

/* ------------------------------------------------------------------ */
/*  Shared data types & datasets                                       */
/* ------------------------------------------------------------------ */

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const products: Product[] = [
  { id: 1, name: "Wireless Keyboard", category: "Peripherals", price: 79.99, stock: 142, status: "In Stock" },
  { id: 2, name: 'Ultra-Wide Monitor 34"', category: "Displays", price: 549.0, stock: 28, status: "In Stock" },
  { id: 3, name: "Ergonomic Mouse", category: "Peripherals", price: 44.95, stock: 7, status: "Low Stock" },
  { id: 4, name: "USB-C Docking Station", category: "Accessories", price: 189.0, stock: 0, status: "Out of Stock" },
  { id: 5, name: "Noise-Cancelling Headset", category: "Audio", price: 299.99, stock: 63, status: "In Stock" },
  { id: 6, name: "Webcam 4K", category: "Video", price: 129.0, stock: 4, status: "Low Stock" },
  { id: 7, name: "Mechanical Keyboard", category: "Peripherals", price: 159.99, stock: 91, status: "In Stock" },
];

const columns: Column<Product>[] = [
  { key: "id", label: "ID", width: "60px" },
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", render: (row) => `$${row.price.toFixed(2)}` },
  { key: "stock", label: "Stock", width: "80px" },
  { key: "status", label: "Status" },
];

/* ------------------------------------------------------------------ */
/*  Meta                                                                */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof DataTable> = {
  title: "UI/DataTable",
  component: DataTable,
  argTypes: {
    sortable: { control: "boolean" },
    striped: { control: "boolean" },
    compact: { control: "boolean" },
    emptyMessage: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<Product>>;

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    columns,
    data: products,
    keyField: "id",
  },
};

export const Striped: Story = {
  args: {
    columns,
    data: products,
    keyField: "id",
    striped: true,
  },
};

export const Compact: Story = {
  args: {
    columns,
    data: products,
    keyField: "id",
    compact: true,
  },
};

const statusVariant: Record<string, "success" | "warning" | "danger"> = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

const columnsWithRenderer: Column<Product>[] = [
  { key: "id", label: "ID", width: "60px" },
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  {
    key: "price",
    label: "Price",
    render: (row) => (
      <strong style={{ fontVariantNumeric: "tabular-nums" }}>
        ${row.price.toFixed(2)}
      </strong>
    ),
  },
  { key: "stock", label: "Stock", width: "80px" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge variant={statusVariant[row.status] ?? "default"}>
        {row.status}
      </Badge>
    ),
  },
];

export const WithCustomRenderer: Story = {
  args: {
    columns: columnsWithRenderer,
    data: products,
    keyField: "id",
    striped: true,
  },
};

export const Clickable: Story = {
  args: {
    columns,
    data: products,
    keyField: "id",
    onRowClick: () => {},
  },
};

export const NonSortable: Story = {
  args: {
    columns,
    data: products,
    keyField: "id",
    sortable: false,
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
    keyField: "id",
    emptyMessage: "No products match your search criteria.",
  },
};

/* Large dataset -- generate 25 rows */
const largeData: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: [
    "Bluetooth Speaker", "Standing Desk", "LED Desk Lamp", "Cable Organizer",
    "Monitor Arm", "Laptop Stand", "Power Strip", "Desk Mat", "Ring Light",
    "External SSD", "Graphics Tablet", "Trackball Mouse", "Wrist Rest",
    "Screen Protector", "Privacy Filter", "USB Hub", "HDMI Switch",
    "Surge Protector", "Desk Shelf", "Footrest", "Air Purifier",
    "Desk Fan", "Whiteboard", "Pen Holder", "Cable Clips",
  ][i],
  category: ["Audio", "Furniture", "Lighting", "Accessories", "Furniture",
    "Accessories", "Power", "Accessories", "Lighting", "Storage",
    "Peripherals", "Peripherals", "Accessories", "Accessories", "Accessories",
    "Accessories", "Video", "Power", "Furniture", "Furniture", "Environment",
    "Environment", "Office", "Office", "Accessories"][i],
  price: Math.round((Math.random() * 300 + 15) * 100) / 100,
  stock: Math.floor(Math.random() * 200),
  status: (["In Stock", "Low Stock", "Out of Stock"] as const)[
    Math.floor(Math.random() * 3)
  ],
}));

export const LargeDataset: Story = {
  args: {
    columns: columnsWithRenderer,
    data: largeData,
    keyField: "id",
    striped: true,
  },
};
