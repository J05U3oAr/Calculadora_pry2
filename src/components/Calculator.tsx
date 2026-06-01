import { useCalculator } from '../hooks/useCalculator'
import Display from './Display'
import Keyboard from './Keyboard'
import './Calculator.css'
const Calculator = () => {
  const calculator = useCalculator()
  return (
    <main className="calculator" aria-label="Calculator">
      <Display value={calculator.display} operation={calculator.operation} />
      <Keyboard
        onDigit={calculator.inputDigit}
        onOperation={calculator.inputOperation}
        onCalculate={calculator.calculate}
        onToggleSign={calculator.toggleSign}
        onClear={calculator.clear}
      />
    </main>
  )
}
export default Calculator
