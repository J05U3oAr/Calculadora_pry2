import type { FC } from 'react'
import { useCalculator } from '../hooks/useCalculator'
import Display from './Display'
import Keyboard from './Keyboard'
import './Calculator.css'

const Calculator: FC = () => {
  const { display, operation, inputDigit, inputOperation, calculate, toggleSign, clear } = useCalculator()

  return (
    <main className="calculator" aria-label="Calculator">
      <Display value={display} operation={operation} />
      <Keyboard
        onDigit={inputDigit}
        onOperation={inputOperation}
        onCalculate={calculate}
        onToggleSign={toggleSign}
        onClear={clear}
      />
    </main>
  )
}

export default Calculator
