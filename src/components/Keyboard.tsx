import type { FC } from 'react'
import type { Operation } from '../hooks/useCalculator'
import Button from './Button'
import './Keyboard.css'

interface Props {
  onDigit: (d: string) => void
  onOperation: (op: Operation) => void
  onCalculate: () => void
  onToggleSign: () => void
  onClear: () => void
}

const Keyboard: FC<Props> = ({ onDigit, onOperation, onCalculate, onToggleSign, onClear }) => (
  <div className="keyboard" role="group" aria-label="Calculator keyboard">
    <Button label="C" variant="clear" onClick={onClear} aria-label="Clear" />
    <Button label="+/-" variant="action" onClick={onToggleSign} aria-label="Toggle sign" />
    <Button label="%" variant="operator" onClick={() => onOperation('%')} aria-label="Modulo" />
    <Button label="÷" variant="operator" onClick={() => onOperation('/')} aria-label="Divide" />
    {['7', '8', '9'].map(d => <Button key={d} label={d} onClick={() => onDigit(d)} />)}
    <Button label="×" variant="operator" onClick={() => onOperation('*')} aria-label="Multiply" />
    {['4', '5', '6'].map(d => <Button key={d} label={d} onClick={() => onDigit(d)} />)}
    <Button label="-" variant="operator" onClick={() => onOperation('-')} aria-label="Subtract" />
    {['1', '2', '3'].map(d => <Button key={d} label={d} onClick={() => onDigit(d)} />)}
    <Button label="+" variant="operator" onClick={() => onOperation('+')} aria-label="Add" />
    <Button label="0" variant="digit" onClick={() => onDigit('0')} />
    <Button label="." variant="digit" onClick={() => onDigit('.')} aria-label="Decimal point" />
    <Button label="=" variant="equals" onClick={onCalculate} aria-label="Equals" />
  </div>
)

export default Keyboard
