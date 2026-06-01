import type { Operation } from './hooks/useCalculator'
import type { ButtonProps, ButtonVariant } from './components/Button'

export type Key = [string, ButtonVariant, ButtonProps['onClick'], string?]

interface KeyboardHandlers {
  onDigit: (digit: string) => void
  onOperation: (operation: Operation) => void
  onCalculate: () => void
  onToggleSign: () => void
  onClear: () => void
}

export const getKeyboardKeys = (handlers: KeyboardHandlers): Key[] => [
  ['C', 'clear', handlers.onClear, 'Clear'], ['+/-', 'action', handlers.onToggleSign, 'Toggle sign'],
  ['%', 'operator', () => handlers.onOperation('%'), 'Modulo'],
  ['/', 'operator', () => handlers.onOperation('/'), 'Divide'],
  ...['7', '8', '9'].map<Key>(d => [d, 'digit', () => handlers.onDigit(d)]),
  ['x', 'operator', () => handlers.onOperation('*'), 'Multiply'],
  ...['4', '5', '6'].map<Key>(d => [d, 'digit', () => handlers.onDigit(d)]),
  ['-', 'operator', () => handlers.onOperation('-'), 'Subtract'],
  ...['1', '2', '3'].map<Key>(d => [d, 'digit', () => handlers.onDigit(d)]),
  ['+', 'operator', () => handlers.onOperation('+'), 'Add'], ['0', 'digit', () => handlers.onDigit('0')],
  ['.', 'digit', () => handlers.onDigit('.'), 'Decimal point'], ['=', 'equals', handlers.onCalculate, 'Equals']
]
