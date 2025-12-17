import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "./FilterBar";
import { useState } from "react";

const meta: Meta<typeof FilterBar> = {
  title: "Search/FilterBar",
  component: FilterBar,
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
type Story = StoryObj<typeof FilterBar>;

const FilterBarWrapper = () => {
  const [metrics, setMetrics] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<string[]>([]);

  const toggle = (set: any) => (val: string) => 
    set((p: string[]) => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  return (
    <FilterBar 
      selectedMetrics={metrics}
      selectedPlatforms={platforms}
      selectedGenres={genres}
      selectedBlogTypes={blogs}
      onMetricToggle={toggle(setMetrics)}
      onPlatformToggle={toggle(setPlatforms)}
      onGenreToggle={toggle(setGenres)}
      onBlogTypeToggle={toggle(setBlogs)}
      onClearAll={() => {
        setMetrics([]);
        setPlatforms([]);
        setGenres([]);
        setBlogs([]);
      }}
      showClearAll={true}
      resultType="all"
    />
  );
};

export const Default: Story = {
  render: () => <FilterBarWrapper />
};
