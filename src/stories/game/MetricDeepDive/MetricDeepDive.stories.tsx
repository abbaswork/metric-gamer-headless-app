import type { Meta, StoryObj } from "@storybook/react";
import { MetricDeepDive } from "./MetricDeepDive";
import { BookOpen, Swords, Monitor, TrendingUp, Trophy } from "lucide-react";

const meta: Meta<typeof MetricDeepDive> = {
  title: "Game/MetricDeepDive",
  component: MetricDeepDive,
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
type Story = StoryObj<typeof MetricDeepDive>;

 const METRICS_DATA = [
    { 
      id: "story", 
      score: 4.8, 
      label: "Narrative Depth", 
      icon: BookOpen, 
      analysis: "Elden Ring's narrative is fragmented, requiring players to piece together the history..."
    },
    { 
      id: "combat", 
      score: 5.0, 
      label: "Combat Complexity", 
      icon: Swords, 
      analysis: "The introduction of jumping attacks and guard counters adds a new layer of dynamism..."
    }
 ];

export const Default: Story = {
  args: {
    metrics: METRICS_DATA
  }
};
