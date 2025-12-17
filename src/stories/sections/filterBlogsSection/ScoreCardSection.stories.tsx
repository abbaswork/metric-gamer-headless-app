import type { Meta, StoryObj } from '@storybook/react';

import { ScoreCardSection } from './ScoreCardSection';
import { blockGames } from '@/stories/const/score';

const meta: Meta<typeof ScoreCardSection> = {
  title: 'Sections/Score Card Section',
  component: ScoreCardSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ScoreCardSection>;


export const Default: Story = {
    args: {
      blockGames: blockGames,
    },
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <Story />
      </div>
    )
  ]
};
