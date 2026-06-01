import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from '../components/Calculator'

const clickButton = (label: string) => {
  const btn = screen.getByRole('button', { name: label })
  fireEvent.click(btn)
}

const getDisplay = () => screen.getByRole('group', { name: /calculator/i })
  .closest('main')!
  .querySelector('.display__value')!.textContent

describe('Calculator component — rendering', () => {
  it('renders initial display with 0', () => {
    render(<Calculator />)
    expect(screen.getByLabelText('Calculator display')).toBeInTheDocument()
    expect(getDisplay()).toBe('0')
  })

  it('renders all digit buttons 0-9', () => {
    render(<Calculator />)
    '0123456789'.split('').forEach(d => {
      expect(screen.getByRole('button', { name: d })).toBeInTheDocument()
    })
  })

  it('renders all required operator buttons', () => {
    render(<Calculator />)
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subtract' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Multiply' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Equals' })).toBeInTheDocument()
  })
})

describe('Calculator component — interaction', () => {
  it('updates display when digit button is clicked', () => {
    render(<Calculator />)
    clickButton('7')
    expect(getDisplay()).toBe('7')
  })

  it('clears display when C is pressed', () => {
    render(<Calculator />)
    clickButton('5'); clickButton('Clear')
    expect(getDisplay()).toBe('0')
  })

  it('shows ERROR on display for negative result', () => {
    render(<Calculator />)
    clickButton('1'); clickButton('Subtract'); clickButton('9'); clickButton('Equals')
    expect(getDisplay()).toBe('ERROR')
  })

  it('performs addition through button clicks', () => {
    render(<Calculator />)
    clickButton('2'); clickButton('Add'); clickButton('3'); clickButton('Equals')
    expect(getDisplay()).toBe('5')
  })

  it('performs multiplication through button clicks', () => {
    render(<Calculator />)
    clickButton('4'); clickButton('Multiply'); clickButton('5'); clickButton('Equals')
    expect(getDisplay()).toBe('20')
  })

  it('clears operand entry after pressing operator', () => {
    render(<Calculator />)
    clickButton('8'); clickButton('Add'); clickButton('2')
    expect(getDisplay()).toBe('2')
  })

  it('displays decimal input correctly', () => {
    render(<Calculator />)
    clickButton('3'); clickButton('Decimal point'); clickButton('1'); clickButton('4')
    expect(getDisplay()).toBe('3.14')
  })
})
