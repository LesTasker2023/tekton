import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    maxVisible: { control: { type: "number", min: 3 } },
    size: { control: "select", options: ["sm", "md"] },
  },
  args: {
    onPageChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    page: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    page: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
  },
};

export const FewPages: Story = {
  args: {
    page: 2,
    totalPages: 3,
  },
};

export const ManyPages: Story = {
  args: {
    page: 25,
    totalPages: 50,
  },
};

export const SmallSize: Story = {
  args: {
    page: 3,
    totalPages: 10,
    size: "sm",
  },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div>
        <Pagination page={page} totalPages={10} onPageChange={setPage} />
        <p style={{ marginTop: 16, opacity: 0.7 }}>
          Current page: <strong>{page}</strong>
        </p>
      </div>
    );
  },
};
