import type { Meta, StoryObj } from '@storybook/react'
import Calculator from '../components/Calculator'

const meta = {
  title: 'Calculator/Calculator',
  component: Calculator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' }
} satisfies Meta<typeof Calculator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
