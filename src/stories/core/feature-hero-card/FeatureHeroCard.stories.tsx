import type { Meta, StoryObj } from "@storybook/react";
import { FeatureHeroCard } from "./FeatureHeroCard";
import { PageContent } from "../../layouts/page-content/PageContent";

const meta: Meta<typeof FeatureHeroCard> = {
  title: "Core/Hero/FeatureHeroCard",
  component: FeatureHeroCard,
  args: {
    href: "/genres/souls-like/elden-ring",
    imageSrc: "https://i.ytimg.com/vi/n3Wliirw7_g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBWiebLgyCDmJwEvOjqNG77sY8Pgw",
    imageAlt: "Souls-like mood background",
    monthLabel: "December 2025",
    title: "Souls-like: Elden Ring",
    description:
      "Step into worlds where every victory is earned and every mistake is punished. Souls-likes like Elden Ring test your patience, skill, and curiosity.",
    stats: [
      { icon: "difficulty", label: "Difficulty", value: "9.2/10" },
      { icon: "bosses",     label: "Bosses",     value: "238" },
      { icon: "time",       label: "Complete",   value: "87 hours" },
    ],
    cta: "Read more",
  },
};

export default meta;
type Story = StoryObj<typeof FeatureHeroCard>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="flex-center">
        <PageContent>
          <Story />
        </PageContent>
      </div>
    ),
  ],
};
