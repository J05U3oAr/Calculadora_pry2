import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/Button'

const meta = {
  title: 'Calculator/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: () => {} },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Digit: Story = { args: { label: '7', variant: 'digit' } }
export const Operator: Story = { args: { label: '+', variant: 'operator' } }
export const Equals: Story = { args: { label: '=', variant: 'equals' } }
export const Clear: Story = { args: { label: 'C', variant: 'clear' } }
export const Action: Story = { args: { label: '+/-', variant: 'action' } }
