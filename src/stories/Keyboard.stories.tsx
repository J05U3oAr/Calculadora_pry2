import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Keyboard from '../components/Keyboard'

const meta = {
  title: 'Calculator/Keyboard',
  component: Keyboard,
  tags: ['autodocs'],
  args: {
    onDigit: fn(),
    onOperation: fn(),
    onCalculate: fn(),
    onToggleSign: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof Keyboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
