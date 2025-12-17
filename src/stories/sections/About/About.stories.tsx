import type { Meta, StoryObj } from "@storybook/react";
import { AboutSection } from "./About";

const meta: Meta<typeof AboutSection> = {
  title: "Sections/About",
  component: AboutSection,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#160026" },
      ],
    },
     nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AboutSection>;

export const Default: Story = {};
