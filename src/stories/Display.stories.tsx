import type { Meta, StoryObj } from '@storybook/react'
import Display from '../components/Display'

const meta = {
  title: 'Calculator/Display',
  component: Display,
  tags: ['autodocs'],
} satisfies Meta<typeof Display>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { value: '0' } }
export const WithNumber: Story = { args: { value: '12345' } }
export const WithDecimal: Story = { args: { value: '3.14159' } }
export const WithOperator: Story = { args: { value: '42', operation: '+' } }
export const MaxDigits: Story = { args: { value: '999999999' } }
export const Negative: Story = { args: { value: '-99999' } }
export const Error: Story = { args: { value: 'ERROR' } }
