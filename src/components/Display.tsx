import type { FC } from 'react'
import './Display.css'

interface Props {
  value: string
  operation?: string | null
}

const Display: FC<Props> = ({ value, operation }) => (
  <div className="display" aria-label="Calculator display" aria-live="polite">
    <span className="display__op">{operation ?? ''}</span>
    <span className={`display__value${value === 'ERROR' ? ' display__value--error' : ''}`}>
      {value}
    </span>
  </div>
)

export default Display
