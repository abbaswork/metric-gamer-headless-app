import type { Meta, StoryObj } from "@storybook/react";
import { SearchHeader } from "./SearchHeader";
import { useState } from "react";

const meta: Meta<typeof SearchHeader> = {
  title: "Search/SearchHeader",
  component: SearchHeader,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#160026" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchHeader>;

const SearchHeaderWrapper = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  return <SearchHeader searchQuery={query} onSearchChange={setQuery} resultType={type} onResultTypeChange={setType} />;
};

export const Default: Story = {
  render: () => <SearchHeaderWrapper />
};
