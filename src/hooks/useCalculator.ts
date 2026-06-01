import { useState, useCallback } from 'react'

export type Operation = '+' | '-' | '*' | '/' | '%' | null

export interface CalculatorState {
  display: string
  pendingValue: number | null
  operation: Operation
  waitingForOperand: boolean
}

const MAX_DIGITS = 9
const MAX_VALUE = 999999999
const ERROR = 'ERROR'

const initialState: CalculatorState = {
  display: '0',
  pendingValue: null,
  operation: null,
  waitingForOperand: false,
}

const clampResult = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return ERROR
  if (value < 0) return ERROR
  if (value > MAX_VALUE) return ERROR
  const str = String(value)
  if (str.length <= MAX_DIGITS) return str
  const intPart = String(Math.floor(value))
  const decimalsAllowed = MAX_DIGITS - intPart.length - 1
  if (decimalsAllowed <= 0) return intPart.length > MAX_DIGITS ? ERROR : intPart
  const fixed = parseFloat(value.toFixed(decimalsAllowed))
  return String(fixed)
}

const applyOperation = (a: number, b: number, op: Operation): number => {
  switch (op) {
  case '+': return a + b
  case '-': return a - b
  case '*': return a * b
  case '/': return b === 0 ? -1 : a / b
  case '%': return b === 0 ? -1 : a % b
  default: return b
  }
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState)

  const inputDigit = useCallback((digit: string) => {
    setState(prev => {
      if (prev.display === ERROR) return prev
      if (prev.waitingForOperand) {
        return { ...prev, display: digit, waitingForOperand: false }
      }
      if (prev.display === '0' && digit !== '.') {
        return { ...prev, display: digit }
      }
      if (digit === '.' && prev.display.includes('.')) return prev
      if (prev.display.length >= MAX_DIGITS) return prev
      return { ...prev, display: prev.display + digit }
    })
  }, [])

  const inputOperation = useCallback((op: Operation) => {
    setState(prev => {
      if (prev.display === ERROR) return { ...initialState, display: ERROR }
      const current = parseFloat(prev.display)
      if (prev.pendingValue !== null && !prev.waitingForOperand) {
        const result = applyOperation(prev.pendingValue, current, prev.operation)
        const displayed = clampResult(result)
        return {
          display: displayed,
          pendingValue: displayed === ERROR ? null : result,
          operation: op,
          waitingForOperand: true,
        }
      }
      return {
        ...prev,
        pendingValue: current,
        operation: op,
        waitingForOperand: true,
      }
    })
  }, [])

  const calculate = useCallback(() => {
    setState(prev => {
      if (prev.display === ERROR) return initialState
      if (prev.pendingValue === null || prev.operation === null) return prev
      const current = parseFloat(prev.display)
      const result = applyOperation(prev.pendingValue, current, prev.operation)
      return {
        display: clampResult(result),
        pendingValue: null,
        operation: null,
        waitingForOperand: true,
      }
    })
  }, [])

  const toggleSign = useCallback(() => {
    setState(prev => {
      if (prev.display === ERROR || prev.display === '0') return prev
      if (prev.display.startsWith('-')) {
        return { ...prev, display: prev.display.slice(1) }
      }
      const raw = prev.display.replace('.', '')
      if (raw.length >= MAX_DIGITS) return prev
      return { ...prev, display: '-' + prev.display }
    })
  }, [])

  const clear = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    display: state.display,
    operation: state.operation,
    inputDigit,
    inputOperation,
    calculate,
    toggleSign,
    clear,
  }
}
