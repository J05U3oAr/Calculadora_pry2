import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCalculator } from '../hooks/useCalculator'

describe('useCalculator — digit input', () => {
  it('shows digit when pressed from initial state', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.inputDigit('5'))
    expect(result.current.display).toBe('5')
  })

  it('concatenates subsequent digits to the right', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.inputDigit('1'); result.current.inputDigit('2'); result.current.inputDigit('3') })
    expect(result.current.display).toBe('123')
  })

  it('replaces 0 with first non-zero digit', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.inputDigit('7'))
    expect(result.current.display).toBe('7')
  })

  it('ignores digits beyond 9 characters', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { '123456789'.split('').forEach(d => result.current.inputDigit(d)) })
    expect(result.current.display).toHaveLength(9)
    act(() => result.current.inputDigit('0'))
    expect(result.current.display).toHaveLength(9)
  })

  it('allows decimal point input', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.inputDigit('3'); result.current.inputDigit('.'); result.current.inputDigit('1') })
    expect(result.current.display).toBe('3.1')
  })

  it('ignores second decimal point', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.inputDigit('3'); result.current.inputDigit('.'); result.current.inputDigit('.') })
    expect(result.current.display.split('.').length - 1).toBe(1)
  })
})

describe('useCalculator — basic operations', () => {
  it('performs addition correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('4')
      result.current.inputOperation('+')
      result.current.inputDigit('3')
      result.current.calculate()
    })
    expect(result.current.display).toBe('7')
  })

  it('performs subtraction correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('9')
      result.current.inputOperation('-')
      result.current.inputDigit('5')
      result.current.calculate()
    })
    expect(result.current.display).toBe('4')
  })

  it('performs multiplication correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('6')
      result.current.inputOperation('*')
      result.current.inputDigit('7')
      result.current.calculate()
    })
    expect(result.current.display).toBe('42')
  })

  it('performs division correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('1')
      result.current.inputDigit('0')
      result.current.inputOperation('/')
      result.current.inputDigit('2')
      result.current.calculate()
    })
    expect(result.current.display).toBe('5')
  })

  it('performs modulo correctly', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('1')
      result.current.inputDigit('0')
      result.current.inputOperation('%')
      result.current.inputDigit('3')
      result.current.calculate()
    })
    expect(result.current.display).toBe('1')
  })
})

describe('useCalculator — chained operations', () => {
  it('shows running result when pressing operator after operator', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('5')
      result.current.inputOperation('+')
      result.current.inputDigit('3')
      result.current.inputOperation('*')
    })
    expect(result.current.display).toBe('8')
  })

  it('chains multiple additions', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('1')
      result.current.inputOperation('+')
      result.current.inputDigit('2')
      result.current.inputOperation('+')
      result.current.inputDigit('3')
      result.current.calculate()
    })
    expect(result.current.display).toBe('6')
  })
})

describe('useCalculator — error conditions', () => {
  it('shows ERROR for negative subtraction result', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('3')
      result.current.inputOperation('-')
      result.current.inputDigit('9')
      result.current.calculate()
    })
    expect(result.current.display).toBe('ERROR')
  })

  it('shows ERROR when result exceeds 999999999', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      '500000000'.split('').forEach(d => result.current.inputDigit(d))
      result.current.inputOperation('+')
      '600000000'.split('').forEach(d => result.current.inputDigit(d))
      result.current.calculate()
    })
    expect(result.current.display).toBe('ERROR')
  })

  it('shows ERROR on division by zero', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('5')
      result.current.inputOperation('/')
      result.current.inputDigit('0')
      result.current.calculate()
    })
    expect(result.current.display).toBe('ERROR')
  })

  it('truncates long division results to 9 chars (e.g. 22/7)', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => {
      result.current.inputDigit('2')
      result.current.inputDigit('2')
      result.current.inputOperation('/')
      result.current.inputDigit('7')
      result.current.calculate()
    })
    expect(result.current.display).not.toBe('ERROR')
    expect(result.current.display.replace('-', '').replace('.', '').length).toBeLessThanOrEqual(9)
  })
})

describe('useCalculator — clear and sign toggle', () => {
  it('clears the calculator to initial state', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.inputDigit('9'); result.current.clear() })
    expect(result.current.display).toBe('0')
    expect(result.current.operation).toBeNull()
  })

  it('toggles sign of a positive number', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.inputDigit('5'); result.current.toggleSign() })
    expect(result.current.display).toBe('-5')
  })

  it('toggles sign back to positive', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { result.current.inputDigit('5'); result.current.toggleSign(); result.current.toggleSign() })
    expect(result.current.display).toBe('5')
  })

  it('sign minus counts as a character toward the 9 char limit', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => { '12345678'.split('').forEach(d => result.current.inputDigit(d)) })
    act(() => result.current.toggleSign())
    expect(result.current.display).toBe('-12345678')
    act(() => result.current.inputDigit('9'))
    expect(result.current.display).toBe('-12345678')
  })
})
